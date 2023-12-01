import type {ThemeType} from 'css-vars-hook';

import type {UnitType} from '../UnitType';

/**
 * @public
 * `useRootTheme` return type.
 */
export type HookInterface = {
    setTheme: (nextTheme: ThemeType) => void;
    getTheme: () => ThemeType;
    setVariable: (variableName: string, value: UnitType) => void;
    getVariable: (variableName: string) => string;
    removeVariable: (variableName: string) => void;
};
