import type {MutableRefObject, CSSProperties} from 'react';

import type {UnitType, Theme} from '@/lib/ThemeType.ts';

const normalizeUnit = (unit: UnitType) => {
    if (typeof unit === 'string') {
        return unit;
    }
    return `${unit}`;
};

/**
 * Add `--` prefix to property names in theme object in order to make it applicable to DOM node
 */
export const createStyleObject = (theme: Theme): CSSProperties => {
    const keys = Object.keys(theme);
    const result: Record<string, UnitType> = {};
    keys.forEach(key => {
        result[`--${key}`] = theme[key];
    });
    return result;
};

/**
 * Add `--` prefix to property names in theme object in order to make it applicable to DOM node
 */
export const createStyleString = (theme: Theme) => {
    const keys = Object.keys(theme);
    let result = '';
    keys.forEach(key => {
        result = `${result}--${key}:${theme[key]};`;
    });
    return result;
};

/**
 * Set CSS theme at the provided DOM node
 */
export const setCSSTheme = (element: HTMLElement) => (theme: Theme) => {
    const style = createStyleString(theme);
    element?.setAttribute('style', style);
};

/**
 * Set CSS variable at the provided DOM node
 */
export const setCSSVariable =
    (element: HTMLElement) => (variableName: string, value: UnitType) => {
        element.style.setProperty(`--${variableName}`, normalizeUnit(value));
    };

/**
 * Remove CSS variable from the provided DOM node
 */
export const removeCSSVariable =
    (ref: MutableRefObject<HTMLElement>) => (variableName: string) => {
        const element = ref.current;
        element?.style?.removeProperty?.(`--${variableName}`);
    };

/**
 * Get CSS variable value at the provided DOM node
 */
export const getCSSVariable =
    (ref: MutableRefObject<HTMLElement>) => (variableName: string) => {
        const element = ref.current;
        return element?.style?.getPropertyValue?.(`--${variableName}`);
    };

/**
 * Set new theme be replacing `style` attribute content
 */
export const setRootTheme = (id: string) => (theme: Theme) => {
    const root = document.getElementById(id)!;
    const style = createStyleString(theme);
    root?.setAttribute('style', style);
};

/**
 * Set CSS variable on theme root element
 */
export const setRootVariable =
    (id: string) => (variableName: string, value: UnitType) => {
        const root = document.getElementById(id)!;
        root?.style?.setProperty?.(`--${variableName}`, normalizeUnit(value));
    };

/**
 * Get CSS variable on theme root element
 */
export const getRootVariable =
    (id: string) =>
    (variableName: string): string => {
        const root = document.getElementById(id)!;
        return root?.style?.getPropertyValue?.(`--${variableName}`);
    };

/**
 * Remove CSS variable from theme root element
 */
export const removeRootVariable = (id: string) => (variableName: string) => {
    const root = document.getElementById(id)!;
    root?.style?.removeProperty?.(`--${variableName}`);
};
