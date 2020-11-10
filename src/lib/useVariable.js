import {useTheme} from 'lib/useTheme';

export const useVariable = (name, value) => {
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
