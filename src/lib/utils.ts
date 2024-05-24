import type {MutableRefObject, CSSProperties} from 'react';
import type {ThemeType} from 'css-vars-hook';

import {ROOT_ID} from './config';
import type {UnitType} from './UnitType';

const normalizeUnit = (unit: UnitType) => {
    if (typeof unit === 'string') {
        return unit;
    }
    return `${unit}`;
};

/** @function
 * @name setCSSVariable
 * @description Set CSS variable at the provided DOM node
 */
export const setCSSVariable =
    (element: HTMLElement) => (variableName: string, value: UnitType) => {
        element.style.setProperty(`--${variableName}`, normalizeUnit(value));
    };

/** @function
 * @name removeCSSVariable
 * @description Remove CSS variable from the provided DOM node
 */
export const removeCSSVariable =
    (ref: MutableRefObject<HTMLElement>) => (variableName: string) => {
        const element = ref.current;
        element?.style?.removeProperty?.(`--${variableName}`);
    };

/** @function
 * @name getCSSVariable
 * @description Get CSS variable value at the provided DOM node
 */
export const getCSSVariable =
    (ref: MutableRefObject<HTMLElement>) => (variableName: string) => {
        const element = ref.current;
        return element?.style?.getPropertyValue?.(`--${variableName}`);
    };

/** @function
 * @name createStyleObject
 * @description Add `--` prefix to property names in theme object in order to make it applicable to DOM node
 */
export const createStyleObject = (theme: Record<string, UnitType>): CSSProperties => {
    const keys = Object.keys(theme);
    const result = {} as Record<string, UnitType>;
    keys.forEach(key => {
        result[`--${key}`] = theme[key];
    });
    return result;
};

/** @function
 * @name getRootElement
 * @description Get theme root element in an SSR-safe way
 */
export const getRootElement = (): HTMLElement => document.getElementById(ROOT_ID)!;

/** @function
 * @name setRootVariable
 * @description Set CSS variable on theme root element
 */
export const setRootVariable = (variableName: string, value: UnitType) => {
    const root = getRootElement();
    root?.style?.setProperty?.(`--${variableName}`, normalizeUnit(value));
};

/** @function
 * @name getRootVariable
 * @description Get CSS variable on theme root element
 */
export const getRootVariable = (variableName: string): string => {
    const root = getRootElement();
    return root?.style?.getPropertyValue?.(`--${variableName}`);
};

/** @function
 * @name removeRootVariable
 * @description Remove CSS variable from theme root element
 */
export const removeRootVariable = (variableName: string) => {
    const root = getRootElement();
    root?.style?.removeProperty?.(`--${variableName}`);
};

/** @function
 * @name stringToKebabCase
 * @description Convert `fooBar` to `foo-bar`
 */
export const stringToKebabCase = (variableName: string) => {
    return variableName
        .split(/(?=[A-Z])/)
        .join('-')
        .toLowerCase();
};

/** @function
 * @name stringToCamelCase
 * @description Convert `foo-bar` to `fooBar`
 */
export const stringToCamelCase = (variableName: string) => {
    return variableName
        .toLowerCase()
        .replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', ''));
};

/** @function
 * @name renameKeys
 * @description Rename Theme object keys using provided transformer function
 */
const renameKeys = (theme: ThemeType, tansformer: (a: string) => string) =>
    Object.keys(theme).reduce(
        (acc, key) => ({
            ...acc,
            ...{[tansformer(key)]: theme[key]},
        }),
        {}
    );

/** @function
 * @name themeToCamelCase
 * @description Convert {`foo-bar`: 'foo'} to {`fooBar`: 'foo'}
 */
export const themeToCamelCase = (theme: ThemeType): ThemeType => {
    return renameKeys(theme, stringToCamelCase);
};

/** @function
 * @name themeToKebabCase
 * @description Convert {`fooBar`: 'foo'} to {`foo-bar`: 'foo'}
 */
export const themeToKebabCase = (theme: ThemeType): ThemeType => {
    return renameKeys(theme, stringToKebabCase);
};
