import type {UnitType} from '@/lib/ThemeType.ts';

/**
 * @public
 * `useRootTheme` return type.
 */
export type HookInterface<TTheme> = {
    setTheme: (nextTheme: TTheme) => void;
    getTheme: () => TTheme;
    setVariable: (variableName: string, value: UnitType) => void;
    getVariable: (variableName: string) => string;
    removeVariable: (variableName: string) => void;
};
