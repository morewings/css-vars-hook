import {useCallback, useRef, useMemo} from 'react';

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
export const useLocalTheme = <TElement extends HTMLElement>() => {
    const themeRef = useRef<Record<string, UnitType>>();
    const elementRef = useRef<TElement>(null);

    const setTheme = useCallback((nextTheme: Record<string, UnitType>) => {
        Object.keys(nextTheme).forEach((key: string) => {
            setCSSVariable(elementRef.current!)(key, nextTheme[key]);
        });

        themeRef.current = nextTheme;
    }, []);

    const getTheme = useCallback(() => themeRef.current, []);

    const getVariable = useCallback((variableName: string) => themeRef.current?.[variableName], []);

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
        /** Get current theme set for LocalRoot */
        getTheme,
        /** Wrapper component which creates DOM node to store theme data */
        LocalRoot: MemoRoot,
        /** React Mutable Ref object attached to LocalRoot */
        ref: elementRef,
        /** Get variable value within LocalRoot theme */
        getVariable,
        /** Effect to set new variable value within LocalRoot theme */
        setVariable,
    };
};
