import type {ThemeType} from 'css-vars-hook';

/**
 * @public
 * `useRootTheme` return type.
 */
export type HookInterface = {
    setTheme: (nextTheme: ThemeType) => void;
    getTheme: () => ThemeType;
    setVariable: (variableName: string, value: string) => void;
    getVariable: (variableName: string) => string;
    removeVariable: (variableName: string) => void;
};
