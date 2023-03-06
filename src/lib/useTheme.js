import {useRef, useCallback} from 'react';
import {setCSSVariable, getCSSVariable, createStyleObject, removeCSSVariable} from 'lib/utils';

/**
 * @typedef {Object} UseThemeInterface
 * @property {MutableRefObject<HTMLElement>} ref - React ref. Use as theme container element getter only.
 * @property {function(element: (HTMLElement | null)): void} setRef - Theme container element setter.
 * @property {Object<string, string>} style - Theme object with all property names prefixed `--`.
 * @property {function(string): string} getVariable - Get variable value. getCSSVariable with bound ref.
 * @see src/lib/utils.js
 * @property {function(variableName: string, value: (string|number)): void} setVariable - Set variable value. setCSSVariable with bound ref.
 * @property {function(variableName: string): string} getVariable - Get variable value. getCSSVariable with bound ref.
 * @property {function(variableName: string): void} removeVariable - Remove variable. removeCSSVariable with bound ref.
 */

/** @function
 * @name useTheme
 * @description React hook to apply multiple CSS variables and manipulate them.
 * @param {Object<string, string>} theme - React ref
 * @return {UseThemeInterface}
 */
export const useTheme = theme => {
  const ref = useRef(null);
  const setVariable = setCSSVariable(ref);
  const getVariable = getCSSVariable(ref);
  const removeVariable = removeCSSVariable(ref);
  const getTheme = () => theme;
  const setTheme = nextTheme => {
    Object.keys(nextTheme).forEach(key => {
      const isEqual = getCSSVariable(ref)(key) === theme[key];
      !isEqual && setCSSVariable(ref)(key, nextTheme[key]);
    });
  };
  const style = createStyleObject(theme);
  const setRef = useCallback(
    element => {
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
