import type {MutableRefObject, CSSProperties} from 'react';
import {ROOT_ID} from 'lib/config';

/** @function
 * @name setCSSVariable
 * @description Set CSS variable
 */
export const setCSSVariable = (ref: MutableRefObject<HTMLElement>) => (variableName: string, value: string) => {
  const element = ref.current;
  element && element.style.setProperty(`--${variableName}`, value);
};

/** @function
 * @name removeCSSVariable
 * @description Remove CSS variable
 */
export const removeCSSVariable = (ref: MutableRefObject<HTMLElement>) => (variableName: string) => {
  const element = ref.current;
  element && element.style.removeProperty(`--${variableName}`);
};

/** @function
 * @name getCSSVariable
 * @description Get CSS variable value
 */
export const getCSSVariable = (ref: MutableRefObject<HTMLElement>) => (variableName: string) => {
  const element = ref.current;
  return element && element.style.getPropertyValue(`--${variableName}`);
};

/** @function
 * @name createStyleObject
 * @description Adds `--` prefix to property names in theme object
 * @param {Object<string, string>} theme - Theme object
 * @return {CSSProperties}
 */
export const createStyleObject = (theme: Record<string, string>): CSSProperties => {
  const keys = Object.keys(theme);
  const result = {};
  keys.forEach(key => {
    result[`--${key}`] = theme[key];
  });
  return result;
};

/** @function
 * @name getRootElement
 * @description Get theme root element in an SSR-safe way
 */
export const getRootElement = (): HTMLElement => document.getElementById(ROOT_ID);

/** @function
 * @name setRootVariable
 * @description Set CSS variable on :root
 */
export const setRootVariable = (variableName: string, value: string) => {
  const root = getRootElement();
  root.style.setProperty(`--${variableName}`, value);
};

/** @function
 * @name getRootVariable
 * @description Set CSS variable on :root
 */
export const getRootVariable = (variableName: string): string => {
  const root = getRootElement();
  return root.style.getPropertyValue(`--${variableName}`);
};

/** @function
 * @name removeRootVariable
 * @description Remove CSS variable from :root
 */
export const removeRootVariable = (variableName: string) => {
  const root = getRootElement();
  root.style.removeProperty(`--${variableName}`);
};
