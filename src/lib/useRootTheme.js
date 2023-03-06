import React, {useCallback, useInsertionEffect, useRef, useEffect} from 'react';
import {
  setRootVariable,
  removeRootVariable,
  setCSSVariable,
  getCSSVariable,
  removeCSSVariable,
  createStyleObject,
} from 'lib/utils';

const ROOT_ID = 'root-theme';

/**
 * @typedef {Object} UseThemeInterface
 * @property {MutableRefObject<HTMLElement>} ref - React ref. Use as theme container element getter only.
 * @property {function(element: (HTMLElement | null)): void} setRef - Theme container element setter.
 * @property {Object<string, string>} style - Theme object with all property names prefixed `--`.
 * @property {function(string): string} getVariable - Get variable value. getCSSVariable with bound ref.
 * @see src/lib/utils.js
 * @property {function(variableName: string, value: (string|number)): void} setVariable - Set variable value. setCSSVariable with bound ref.
 * @property {function(variableName: string): string} getVariable - Get variable value. getCSSVariable with bound ref.
 * @property {function(variableName: string): void} removeVariable - Remove variable. removeCSSVariable with bound ref.
 */

const getRootElement = () => document.getElementById(ROOT_ID);

/** @function
 * @name useRootTheme
 * @description React hook to apply multiple CSS variables and manipulate them.
 * @param {Object<string, string>} theme - React ref
 * @return {UseThemeInterface}
 */
export const useRootTheme = theme => {
  const ref = useRef(null);
  const setVariable = setCSSVariable(ref);
  const getVariable = getCSSVariable(ref);
  const removeVariable = removeCSSVariable(ref);
  const getTheme = () => theme;
  const replaceTheme = nextTheme => {
    const element = getRootElement();

    Object.keys(theme).forEach(key => {
      removeCSSVariable({current: element})(key);
    });

    Object.keys(nextTheme).forEach(key => {
      setCSSVariable({current: element})(key, nextTheme[key]);
    });
  };
  const appendTheme = nextTheme => {
    const element = getRootElement();
    Object.keys(nextTheme).forEach(key => {
      const isEqual = getCSSVariable({current: element})(key) === theme[key];
      !isEqual && setCSSVariable({current: element})(key, nextTheme[key]);
    });
  };
  const style = createStyleObject(theme);

  // if (element) {
  //   Object.keys(theme).forEach(key => {
  //     const isEqual = getCSSVariable({current: element})(key) === theme[key];
  //     !isEqual && setCSSVariable({current: element})(key, theme[key]);
  //   });
  //
  //   ref.current = element
  // }

  const setRef = () => {};
  // const setRef = useCallback(
  //   element => {
  //     if (ref.current) {
  //       // Make sure to cleanup any events/references added to the last instance
  //     }
  //
  //     if (element) {
  //       Object.keys(theme).forEach(key => {
  //         const isEqual = getCSSVariable({current: element})(key) === theme[key];
  //         !isEqual && setCSSVariable({current: element})(key, theme[key]);
  //       });
  //     }
  //
  //     // Save a reference to the node
  //     ref.current = element;
  //   },
  //   [theme]
  // );

  return {ref, setRef, style, setVariable, getVariable, removeVariable, getTheme, replaceTheme, appendTheme};
};

export const RootThemeProvider = ({children}) => {
  const theme = {
    foo: 1,
  };
  const {setRef, style, replaceTheme, appendTheme} = useRootTheme(theme);
  useEffect(() => {
    replaceTheme({bar: 2});
  }, []);
  return (
    <div ref={setRef} id={ROOT_ID} style={style}>
      {children}
    </div>
  );
};
