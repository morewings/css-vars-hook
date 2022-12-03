import {useInsertionEffect} from 'react';
import {setRootVariable, removeRootVariable} from 'lib/utils';

export const useRootTheme = (theme = {}) => {
  // const root = useRef(document.querySelector(':root'));
  useInsertionEffect(() => {
    Object.keys(theme).forEach(key => {
      setRootVariable(key, theme[key]);
    });
  }, [theme]);
  return {
    setRootVariable,
    removeRootVariable,
  };
};
