import {useCallback, useRef} from 'react';
import {createStyleObject, getRootVariable, removeRootVariable, setRootVariable} from 'lib/utils';

export const useRootThemeActions = theme => {
  const themeRef = useRef(theme);

  const setTheme = useCallback(nextTheme => {
    Object.keys(nextTheme).forEach(key => {
      const isEqual = getRootVariable(key) === themeRef.current[key];
      !isEqual && setRootVariable(key, nextTheme[key]);
    });

    themeRef.current = nextTheme;
  }, []);

  const getTheme = useCallback(() => themeRef.current, []);

  const getVariable = useCallback(variableName => getRootVariable(variableName), []);
  const setVariable = useCallback((variableName, value) => {
    setRootVariable(variableName, value);
    themeRef.current = {
      ...themeRef.current,
      [variableName]: value,
    };
  }, []);

  const removeVariable = useCallback(variableName => {
    removeRootVariable(variableName);
    const nextTheme = {...themeRef.current};
    // eslint-disable-next-line fp/no-delete
    delete nextTheme[variableName];
    themeRef.current = nextTheme;
  }, []);

  const style = createStyleObject(themeRef.current);

  return {setTheme, style, getTheme, getVariable, setVariable, removeVariable};
};
