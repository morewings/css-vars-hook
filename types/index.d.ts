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

  export function useTheme<ThemeType = ThemeObject>(theme: ThemeType): HookInterface<ThemeType>;

  export function useVariable(name: string, value: Value): HookInterface<Record<string, Value>>;
}
