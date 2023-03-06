import {useCallback, useRef} from 'react';
import {createStyleObject, getRootVariable, setRootVariable} from 'lib/utils';

export const useThemeActions = theme => {
  const themeRef = useRef(theme);

  const setTheme = useCallback(nextTheme => {
    Object.keys(nextTheme).forEach(key => {
      const isEqual = getRootVariable(key) === themeRef.current[key];
      !isEqual && setRootVariable(key, nextTheme[key]);
    });

    themeRef.current = nextTheme;
  }, []);

  const getTheme = useCallback(() => themeRef.current, []);

  const style = createStyleObject(themeRef.current);

  return {setTheme, style, getTheme};
};
