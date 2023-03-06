import {useCallback, useRef} from 'react';
import {createStyleObject, getRootVariable, removeRootVariable, setRootVariable} from 'lib/utils';
import type {ThemeType} from 'lib/ThemeType';

export const useRootThemeActions = (theme: ThemeType) => {
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

  return {setTheme, style, getTheme, getVariable, setVariable, removeVariable};
};
