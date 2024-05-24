import {useCallback, useMemo, useRef} from 'react';
import type {CSSProperties} from 'react';
import type {ThemeType} from 'css-vars-hook';

import {
    createStyleObject,
    getRootVariable,
    removeRootVariable,
    setRootVariable,
    stringToCamelCase,
    stringToKebabCase,
    themeToCamelCase,
    themeToKebabCase,
} from '../utils';
import type {HookInterface} from './HookInterfaceType';
import type {UnitType} from '../UnitType';

const normalizeTheme = (theme: ThemeType, isEnabled: boolean) => {
    const kebab = isEnabled ? themeToKebabCase(theme) : theme;
    const camel = isEnabled ? themeToCamelCase(theme) : theme;
    return {kebab, camel};
};

const normalizeVariable = (variableName: string, isEnabled: boolean) => {
    const kebab = isEnabled ? stringToKebabCase(variableName) : variableName;
    const camel = isEnabled ? stringToCamelCase(variableName) : variableName;
    return {kebab, camel};
};

/**
 * @private
 * Logic for root theme handling such as updates and CSS style creation
 */
export const useRootTheme = (
    theme: ThemeType,
    transformCase: boolean
): HookInterface & {style: CSSProperties} => {
    const themeRef = useRef(theme);

    const setTheme = useCallback(
        (nextTheme: ThemeType) => {
            const normalizedTheme = normalizeTheme(nextTheme, transformCase).kebab;
            Object.keys(normalizedTheme).forEach(key => {
                setRootVariable(key, normalizedTheme[key]);
            });

            themeRef.current = nextTheme;
        },
        [transformCase]
    );

    const getTheme = useCallback(() => themeRef.current, []);

    const getVariable = useCallback(
        (variableName: string) => {
            const normalizedVariableName = normalizeVariable(
                variableName,
                transformCase
            ).camel;
            return getRootVariable(normalizedVariableName);
        },
        [transformCase]
    );

    const setVariable = useCallback(
        (variableName: string, value: UnitType) => {
            const normalizedVariableName = normalizeVariable(
                variableName,
                transformCase
            ).kebab;
            setRootVariable(normalizedVariableName, value);
            themeRef.current = {
                ...themeRef.current,
                [variableName]: value,
            };
        },
        [transformCase]
    );

    const removeVariable = useCallback(
        (variableName: string) => {
            const normalizedVariableName = normalizeVariable(
                variableName,
                transformCase
            ).kebab;
            removeRootVariable(normalizedVariableName);
            const nextTheme = {...themeRef.current};
            delete nextTheme[variableName];
            themeRef.current = nextTheme;
        },
        [transformCase]
    );

    const style = useMemo(() => {
        const normalizedTheme = normalizeTheme(themeRef.current, transformCase).kebab;
        return createStyleObject(normalizedTheme);
    }, [transformCase]);

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
