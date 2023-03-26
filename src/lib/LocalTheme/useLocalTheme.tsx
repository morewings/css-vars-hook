import type {FC, ReactNode} from 'react';
import {useCallback, useRef, createElement} from 'react';

import type {ThemeType} from '../ThemeType';
import {createStyleObject, setCSSVariable} from '../utils';

/**
 * @public
 * React hook to apply multiple CSS variables to generated local root element (LocalRoot) and manipulate them.
 * @example
 * const {setTheme, getTheme, Component, getVariable, setVariable} = useLocalTheme({foo: 'bar'});
 * const setThemeIvory = () => {
 *   setTheme({foo: 'ivory'});
 *   console.log('full theme', getTheme()) // => {foo: 'ivory'};
 *   console.log('foo value', getVariable('foo')) // => 'ivory';
 *};
 * return <Component className="demo-local">//...
 */
export const useLocalTheme = (theme: ThemeType, elementType: string = 'div') => {
    const themeRef = useRef(theme);
    const elementRef = useRef<HTMLDivElement>(null);

    const setTheme = useCallback((nextTheme: ThemeType) => {
        Object.keys(nextTheme).forEach(key => {
            setCSSVariable(elementRef)(key, nextTheme[key]);
        });

        themeRef.current = nextTheme;
    }, []);

    const getTheme = useCallback(() => themeRef.current, []);

    const getVariable = useCallback((variableName: keyof ThemeType) => themeRef.current[variableName], []);

    const setVariable = useCallback((variableName: keyof ThemeType, variableValue: string) => {
        setCSSVariable(elementRef)(variableName, variableValue);
        themeRef.current = {...themeRef.current, [variableName]: variableValue};
    }, []);

    const style = createStyleObject(themeRef.current);

    const LocalRoot: FC<JSX.IntrinsicAttributes & {children?: ReactNode; className?: string}> = ({
        children,
        className,
    }) => {
        return createElement(elementType, {className, ref: elementRef, style}, children);
    };

    return {
        /** Effect to apply new theme to LocalRoot */
        setTheme,
        /** Get current theme set for LocalRoot */
        getTheme,
        /** Wrapper component which creates DOM node to store theme data */
        LocalRoot,
        /** React Mutable Ref object attached to LocalRoot */
        ref: elementRef,
        /** Get variable value within LocalRoot theme */
        getVariable,
        /** Effect to set new variable value within LocalRoot theme */
        setVariable,
    };
};
