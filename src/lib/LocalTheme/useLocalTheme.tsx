import React, {useCallback, useRef, memo, useMemo} from 'react';

import {setCSSVariable} from '../utils';
import type {LocalRootProps} from './LocalRoot';
import {LocalRoot} from './LocalRoot';
import type {UnitType} from '../UnitType';

/**
 * @public
 * React hook to apply multiple CSS variables to generated local root element (LocalRoot) and manipulate them.
 * Theme type is inferred from provided theme parameter.
 * @example
 * const {setTheme, getTheme, LocalRoot, getVariable, setVariable} = useLocalTheme();
 * const setThemeIvory = () => {
 *   setTheme({foo: 'ivory'});
 *   console.log('full theme', getTheme()) // => {foo: 'ivory'};
 *   console.log('foo value', getVariable('foo')) // => 'ivory';
 *};
 * return <LocalRoot theme={{foo: 'bar'}} className="demo-local">//...
 */
export const useLocalTheme = <TTheme extends Record<string, UnitType>>() => {
    const themeRef = useRef<TTheme>();
    const elementRef = useRef<HTMLElement>(null);

    const setTheme = useCallback((nextTheme: TTheme) => {
        Object.keys(nextTheme).forEach((key: string) => {
            setCSSVariable(elementRef)(key, nextTheme[key]);
        });

        themeRef.current = nextTheme;
    }, []);

    const getTheme = useCallback(() => themeRef.current, []);

    const getVariable = useCallback((variableName: string) => themeRef.current[variableName], []);

    const setVariable = useCallback((variableName: string, variableValue: UnitType) => {
        setCSSVariable(elementRef)(variableName, variableValue);
        themeRef.current = {...themeRef.current, [variableName]: variableValue};
    }, []);

    const LocalRootMemoized = useMemo(() => LocalRoot, []);

    return {
        /** Effect to apply new theme to LocalRoot */
        setTheme,
        /** Get current theme set for LocalRoot */
        getTheme,
        /** Wrapper component which creates DOM node to store theme data */
        LocalRoot: ({children, ...restProps}: Omit<LocalRootProps, 'setTheme'>) => (
            <LocalRootMemoized {...restProps} setTheme={setTheme} ref={elementRef}>
                {children}
            </LocalRootMemoized>
        ),
        /** React Mutable Ref object attached to LocalRoot */
        ref: elementRef,
        /** Get variable value within LocalRoot theme */
        getVariable,
        /** Effect to set new variable value within LocalRoot theme */
        setVariable,
    };
};
