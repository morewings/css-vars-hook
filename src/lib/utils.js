/** @function
 * @name setCSSVariable
 * @description Set CSS variable
 * @param {HTMLElement} element - HTML element to contain variable
 * @return {function(string, string): void}
 */
export const setCSSVariable = element => (variableName, value) => {
  element && element.style.setProperty(`--${variableName}`, value);
};

/** @function
 * @name removeCSSVariable
 * @description Remove CSS variable
 * @param {HTMLElement} element - HTML element to contain variable
 * @param {string} variableName - variable name, should start with `--`
 * @return {void}
 */
export const removeCSSVariable = (element, variableName) => {
  element && element.style.removeProperty(`--${variableName}`);
};

/** @function
 * @name getCSSVariable
 * @description Get CSS variable value
 * @param {HTMLElement} element - HTML element to contain variable
 * @return {function(string): string}
 */
export const getCSSVariable = element => variableName => element && element.style.getPropertyValue(`--${variableName}`);
