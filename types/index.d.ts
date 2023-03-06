import { ThemeMethods } from "css-vars-hook";

declare module 'css-vars-hook' {
  import * as React from 'react';

  /**
   * This interface can be augmented by users to add default types for the theme
   * Use module augmentation to append your own type definition in a your_custom_type.d.ts file.
   * https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation
   */
  interface ThemeObject extends Record<string, string> {}

  type Value = string | number;

  interface HookInterface<ThemeType = ThemeObject> {
    ref: React.RefObject<HTMLElement>;
    setRef: (element: HTMLElement | null) => void;
    style: CSSProperties;
    setVariable: (variableName: keyof ThemeType, value: Value) => void;
    getVariable: (variableName: keyof ThemeType) => string;
    removeVariable: (variableName: keyof ThemeType) => void;
  }

  type ThemeMethods<ThemeType> = {
    getTheme: () => ThemeType;
    setTheme: (arg0: ThemeType) => void;
  }

  export function useTheme<ThemeType = ThemeObject>(theme: ThemeType): HookInterface<ThemeType> & ThemeMethods<ThemeType>;

  export function useVariable(name: string, value: Value): HookInterface<Record<string, Value>>;

  export function useRootTheme<ThemeType = ThemeObject>(theme: ThemeType): ThemeMethods<ThemeType> & {style: Record<string, string>};
}
