import {ROOT_ID} from 'lib/config';

/** @function
 * @name setCSSVariable
 * @description Set CSS variable
 * @param {MutableRefObject<HTMLElement>} ref - React ref
 * @return {function(string, string): void}
 */
export const setCSSVariable = ref => (variableName, value) => {
  const element = ref.current;
  element && element.style.setProperty(`--${variableName}`, value);
};

/** @function
 * @name removeCSSVariable
 * @description Remove CSS variable
 * @param {MutableRefObject<HTMLElement>} ref - React ref
 * @return {function(string): void}
 */
export const removeCSSVariable = ref => variableName => {
  const element = ref.current;
  element && element.style.removeProperty(`--${variableName}`);
};

/** @function
 * @name getCSSVariable
 * @description Get CSS variable value
 * @param {MutableRefObject<HTMLElement>} ref - React ref
 * @return {function(string): string}
 */
export const getCSSVariable = ref => variableName => {
  const element = ref.current;
  return element && element.style.getPropertyValue(`--${variableName}`);
};

/** @function
 * @name createStyleObject
 * @description Adds `--` prefix to property names in theme object
 * @param {Object<string, string>} theme - Theme object
 * @return {Object<string, string>}
 */
export const createStyleObject = theme => {
  const keys = Object.keys(theme);
  const result = {};
  keys.forEach(key => {
    // eslint-disable-next-line fp/no-mutation
    result[`--${key}`] = theme[key];
  });
  return result;
};

/** @function
 * @name getRootElement
 * @description Get theme root element in an SSR-safe way
 * @return {HTMLElement}
 */
export const getRootElement = () => document.getElementById(ROOT_ID);

/** @function
 * @name setRootVariable
 * @description Set CSS variable on :root
 * @param {string} variableName - CSS variable name without `--` prefix
 * @param {string} value - CSS variable value
 */
export const setRootVariable = (variableName, value) => {
  const root = getRootElement();
  root.style.setProperty(`--${variableName}`, value);
};

/** @function
 * @name getRootVariable
 * @description Set CSS variable on :root
 * @param {string} variableName - CSS variable name without `--` prefix
 * @return {string} CSS variable value
 */
export const getRootVariable = variableName => {
  const root = getRootElement();
  return root.style.getPropertyValue(`--${variableName}`);
};

/** @function
 * @name removeRootVariable
 * @description Remove CSS variable from :root
 * @param {string} variableName - CSS variable name without `--` prefix
 */
export const removeRootVariable = variableName => {
  const root = getRootElement();
  root.style.removeProperty(`--${variableName}`);
};
