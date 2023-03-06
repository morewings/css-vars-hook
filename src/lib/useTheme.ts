import {useRef, useCallback} from 'react';
import {setCSSVariable, getCSSVariable, createStyleObject, removeCSSVariable} from 'lib/utils';

import type {ThemeType} from './ThemeType';

/** @function
 * @name useTheme
 * @description React hook to apply multiple CSS variables and manipulate them.
 */
export const useTheme = (theme: ThemeType) => {
  const ref = useRef<HTMLElement>(null);
  const setVariable = setCSSVariable(ref);
  const getVariable = getCSSVariable(ref);
  const removeVariable = removeCSSVariable(ref);
  const getTheme = () => theme;
  const setTheme = (nextTheme: ThemeType) => {
    Object.keys(nextTheme).forEach(key => {
      const isEqual = getCSSVariable(ref)(key) === theme[key];
      !isEqual && setCSSVariable(ref)(key, nextTheme[key]);
    });
  };
  const style = createStyleObject(theme);
  const setRef = useCallback(
    (element: HTMLElement) => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }

      if (element) {
        Object.keys(theme).forEach(key => {
          const isEqual = getCSSVariable({current: element})(key) === theme[key];
          !isEqual && setCSSVariable({current: element})(key, theme[key]);
        });
      }

      // Save a reference to the node
      ref.current = element;
    },
    [theme]
  );

  return {ref, setRef, style, setVariable, getVariable, removeVariable, getTheme, setTheme};
};
