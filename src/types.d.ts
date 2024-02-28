declare module '*.module.css' {
    const classes: Record<string, string>;
    export default classes;
}

declare module 'css-vars-hook' {
    /** The most common theme type */
    export type ThemeType = Record<string, string | number>;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
