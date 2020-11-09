/** @function
 * @name setCSSVariable
 * @description Set CSS variable
 * @param {Object} ref - React ref
 * @return {function(string, string): void}
 */
export const setCSSVariable = ref => (variableName, value) => {
  const element = ref.current;
  element && element.style.setProperty(`--${variableName}`, value);
};

/** @function
 * @name removeCSSVariable
 * @description Remove CSS variable
 * @param {HTMLElement} ref - React ref
 * @return {function(string): void}
 */
export const removeCSSVariable = ref => variableName => {
  const element = ref.current;
  element && element.style.removeProperty(`--${variableName}`);
};

/** @function
 * @name getCSSVariable
 * @description Get CSS variable value
 * @param {Object} ref - React ref
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
    result[`--${key}`] = theme.key;
  });
  return result;
};
