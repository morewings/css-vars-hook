declare module '*.module.css' {
  const classes: {[key: string]: string};
  export default classes;
}

declare module 'css-vars-hook' {
  export type ThemeType = Record<string, string>;
}
