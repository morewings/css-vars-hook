declare module 'css-vars-hook' {
  import * as React from 'react';

  type ThemeObject = Record<string, string>;

  type Value = string | number;

  interface HookInterface {
    ref: React.RefObject<HTMLElement>;
    setRef: (element: HTMLElement | null) => void;
    style: ThemeObject;
    setVariable: (variableName: string, value: Value) => void;
    getVariable: (variableName: string) => string;
    removeVariable: (variableName: string) => void;
  }

  export function useTheme(theme: ThemeObject): HookInterface;

  export function useVariable(name: string, value: Value): HookInterface;
}
