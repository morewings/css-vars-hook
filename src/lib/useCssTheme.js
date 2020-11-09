import {useRef, useCallback} from 'react';
import {setCSSVariable, getCSSVariable} from 'lib/utils';

const createStyleObject = theme => {
  const keys = Object.keys(theme);
  const result = {};
  keys.forEach(key => {
    result[`--${key}`] = theme.key;
  });
  return result;
};

export const useCssTheme = ({theme}) => {
  const ref = useRef(null);
  const setVariable = setCSSVariable(ref);
  const getVariable = getCSSVariable(ref);
  const style = createStyleObject(theme);
  const setRef = useCallback(
    element => {
      if (ref.current) {
        // Make sure to cleanup any events/references added to the last instance
      }

      if (element) {
        Object.keys(theme).forEach(key => {
          const isEqual = getCSSVariable({current: element})(key) === theme[key];
          !isEqual && setCSSVariable({current: element})(key, theme[key]);
        });
      }

      // Save a reference to the node
      ref.current = element;
    },
    [theme]
  );

  return {ref, setRef, style, setVariable, getVariable};
};
