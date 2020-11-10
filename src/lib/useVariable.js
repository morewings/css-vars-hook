import {useTheme} from 'lib/useTheme';

/**
 * @typedef {Object} UseThemeInterface
 * @property {MutableRefObject<null>} ref - React ref. Use as theme container element getter only.
 * @property {function(HTMLElement): void} setRef - Theme container element setter.
 * @property {Object<string, string>} style - Theme object with all property names prefixed `--`.
 * @property {function(string): string} getVariable - Get variable value. getCSSVariable with bound ref.
 * @see src/lib/utils.js
 * @property {function(variableName: string, value: (string|number)): void} setVariable - Set variable value. setCSSVariable with bound ref.
 * @property {function(variableName: string): string} getVariable - Get variable value. getCSSVariable with bound ref.
 * @property {function(variableName: string): string} removeVariable - Remove variable. removeCSSVariable with bound ref.
 */

/** @function
 * @name useTheme
 * @description React hook to apply multiple CSS variables and manipulate them.
 * @param {string} name - Name of the variable, without `--`.
 * @param {string} value - value of the variable.
 * @return {UseThemeInterface}
 */

export const useVariable = (name, value) => {
  const {ref, setRef, style, setVariable, getVariable, removeVariable} = useTheme({[name]: value});
  return {
    ref,
    setRef,
    style,
    setVariable,
    getVariable,
    removeVariable,
  };
};
