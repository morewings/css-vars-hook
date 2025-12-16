import {useCallback, useRef, useMemo} from 'react';

import {setCSSVariable, setCSSTheme} from '@/lib/utils';
import type {UnitType, Theme} from '@/lib/ThemeType.ts';

import type {LocalRootProps} from './LocalRoot';
import {LocalRoot} from './LocalRoot';

/**
 * @public
 * React hook to apply multiple CSS variables to a generated local root element (LocalRoot) and manipulate them.
 * Theme type is inferred from the provided theme parameter.
 * @example
 * const {setTheme, getTheme, LocalRoot, getVariable, setVariable} = useLocalTheme();
 * const setThemeIvory = () => {
 *   setTheme({foo: 'ivory'});
 *   console.log('full theme', getTheme()) // => {foo: 'ivory'};
 *   console.log('foo value', getVariable('foo')) // => 'ivory';
 *};
 * return <LocalRoot theme={{foo: 'bar'}} className="demo-local">//...
 */
export const useLocalTheme = <TElement extends HTMLElement>() => {
    const themeRef = useRef<Theme>({});
    const elementRef = useRef<TElement>(null);

    const setTheme = useCallback((nextTheme: Theme) => {
        setCSSTheme(elementRef.current!)(nextTheme);

        themeRef.current = nextTheme;
    }, []);

    const getTheme = useCallback(() => themeRef.current, []);

    const getVariable = useCallback(
        (variableName: string) => themeRef.current?.[variableName],
        []
    );

    const setVariable = useCallback((variableName: string, variableValue: UnitType) => {
        setCSSVariable(elementRef.current!)(variableName, variableValue);
        themeRef.current = {...themeRef.current, [variableName]: variableValue};
    }, []);

    const MemoRoot = useMemo(
        () =>
            // eslint-disable-next-line react/display-name
            ({children, ...restProps}: Omit<LocalRootProps, 'setTheme'>) => (
                <LocalRoot {...restProps} setTheme={setTheme} ref={elementRef}>
                    {children}
                </LocalRoot>
            ),
        [setTheme]
    );

    return {
        /** Effect to apply new theme to LocalRoot */
        setTheme,
        /** Get the current theme set for LocalRoot */
        getTheme,
        /** Wrapper component which creates a DOM node to store theme data */
        LocalRoot: MemoRoot,
        /** React Mutable Ref object attached to LocalRoot */
        ref: elementRef,
        /** Get variable value within the LocalRoot theme */
        getVariable,
        /** Effect to set new variable value within LocalRoot theme */
        setVariable,
    };
};
