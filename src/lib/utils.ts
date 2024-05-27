import type {MutableRefObject, CSSProperties} from 'react';
import type {ThemeType} from 'css-vars-hook';

import type {UnitType} from '@/lib/UnitType';

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
export const createStyleObject = (theme: ThemeType): CSSProperties => {
    const keys = Object.keys(theme);
    const result = {} as ThemeType;
    keys.forEach(key => {
        result[`--${key}`] = theme[key];
    });
    return result;
};

/** @function
 * @name setRootVariable
 * @description Set CSS variable on theme root element
 */
export const setRootVariable =
    (id: string) => (variableName: string, value: UnitType) => {
        const root = document.getElementById(id)!;
        root?.style?.setProperty?.(`--${variableName}`, normalizeUnit(value));
    };

/** @function
 * @name getRootVariable
 * @description Get CSS variable on theme root element
 */
export const getRootVariable =
    (id: string) =>
    (variableName: string): string => {
        const root = document.getElementById(id)!;
        return root?.style?.getPropertyValue?.(`--${variableName}`);
    };

/** @function
 * @name removeRootVariable
 * @description Remove CSS variable from theme root element
 */
export const removeRootVariable = (id: string) => (variableName: string) => {
    const root = document.getElementById(id)!;
    root?.style?.removeProperty?.(`--${variableName}`);
};
