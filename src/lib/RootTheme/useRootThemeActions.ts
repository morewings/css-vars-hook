import {useCallback, useRef} from 'react';
import type {CSSProperties} from 'react';
import type {ThemeType} from 'css-vars-hook';

import type {HookInterface} from './HookInterfaceType';
import {createStyleObject, getRootVariable, removeRootVariable, setRootVariable} from '../utils';

export const useRootThemeActions = (theme: ThemeType): HookInterface & {style: CSSProperties} => {
  const themeRef = useRef(theme);

  const setTheme = useCallback((nextTheme: ThemeType) => {
    Object.keys(nextTheme).forEach(key => {
      setRootVariable(key, nextTheme[key]);
    });

    themeRef.current = nextTheme;
  }, []);

  const getTheme = useCallback(() => themeRef.current, []);

  const getVariable = useCallback((variableName: string) => getRootVariable(variableName), []);
  const setVariable = useCallback((variableName: string, value: string) => {
    setRootVariable(variableName, value);
    themeRef.current = {
      ...themeRef.current,
      [variableName]: value,
    };
  }, []);

  const removeVariable = useCallback((variableName: string) => {
    removeRootVariable(variableName);
    const nextTheme = {...themeRef.current};
    delete nextTheme[variableName];
    themeRef.current = nextTheme;
  }, []);

  const style = createStyleObject(themeRef.current);

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
