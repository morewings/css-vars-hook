import {useTheme} from './useTheme';

/**
 * @public
 * React hook to apply single CSS variable and manipulate it.
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
