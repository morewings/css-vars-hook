import type {useRootThemeActions} from './useRootThemeActions';

export type HookInterface = Pick<
  ReturnType<typeof useRootThemeActions>,
  'setTheme' | 'getTheme' | 'getVariable' | 'setVariable' | 'removeVariable'
>;
