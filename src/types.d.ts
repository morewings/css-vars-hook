declare module '*.module.css' {
    const classes: Record<string, string>;
    export default classes;
}

declare module 'css-vars-hook' {
    import type {UnitType} from '@/lib';
    /** The most common theme type */
    export type ThemeType = Record<string, UnitType>;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
