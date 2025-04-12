import type {UnitType, Theme} from '@/lib/ThemeType.ts';

/**
 * @public
 * `useRootTheme` return type.
 */
export type HookInterface = {
    setTheme: (nextTheme: Theme) => void;
    getTheme: () => Theme;
    setVariable: (variableName: string, value: UnitType) => void;
    getVariable: (variableName: string) => string;
    removeVariable: (variableName: string) => void;
};
