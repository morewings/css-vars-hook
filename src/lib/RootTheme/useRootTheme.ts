import {useCallback, useMemo, useRef} from 'react';
import type {CSSProperties} from 'react';

import type {UnitType, Theme} from '@/lib/ThemeType.ts';

import {
    createStyleObject,
    getRootVariable,
    removeRootVariable,
    setRootVariable,
    setRootTheme,
} from '../utils';
import type {HookInterface} from './HookInterfaceType';

/**
 * @private
 * Logic for root theme handling such as updates and CSS style creation
 */
export const useRootTheme = <TTheme extends Theme>(
    theme: TTheme,
    id: string
): HookInterface<TTheme> & {style: CSSProperties} => {
    const themeRef = useRef(theme);

    const setTheme = useCallback(
        (nextTheme: TTheme) => {
            setRootTheme(id)(nextTheme);
            themeRef.current = nextTheme;
        },
        [id]
    );

    const getTheme = useCallback(() => themeRef.current, []);

    const getVariable = useCallback(
        (variableName: string) => getRootVariable(id)(variableName),
        [id]
    );
    const setVariable = useCallback(
        (variableName: string, value: UnitType) => {
            setRootVariable(id)(variableName, value);
            themeRef.current = {
                ...themeRef.current,
                [variableName]: value,
            };
        },
        [id]
    );

    const removeVariable = useCallback(
        (variableName: string) => {
            removeRootVariable(id)(variableName);
            const nextTheme = {...themeRef.current};
            delete nextTheme[variableName];
            themeRef.current = nextTheme;
        },
        [id]
    );

    const style = useMemo(() => createStyleObject(themeRef.current), []);

    return {
        /** Effect to apply new theme to the application */
        setTheme,
        /** CSSProperties object to apply to container div */
        style,
        /** Get current theme */
        getTheme,
        /** Get variable value within active theme */
        getVariable,
        /** Effect to set new variable value within active theme */
        setVariable,
        /** Effect to remove variable within active theme */
        removeVariable,
    };
};
