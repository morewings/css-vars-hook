import {useTheme} from './useTheme';

/**
 * @deprecated
 * `useLocalTheme` is recommended instead
 * @example
 * const {getVariable, setVariable, LocalRoot} = useLocalTheme(theme)
 */
export const useVariable = (name: string, value: string) => {
  const {ref, setRef, style, setVariable, getVariable, removeVariable} = useTheme({[name]: value});
  return {
    ref,
    setRef,
    style,
    setVariable,
    getVariable,
    removeVariable,
  };
};
