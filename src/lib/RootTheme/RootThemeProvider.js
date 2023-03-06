import React, {useMemo} from 'react';
import {ROOT_ID} from 'lib/config';
import {RootContext} from './RootContext';
import {useRootThemeActions} from './useRootThemeActions';

export const RootThemeProvider = ({children, theme = {}}) => {
  const {setTheme, style, getTheme, getVariable, setVariable, removeVariable} = useRootThemeActions(theme);

  const {Provider} = RootContext;

  const actions = useMemo(
    () => ({setTheme, style, getTheme, getVariable, setVariable, removeVariable}),
    [setTheme, style, getTheme, getVariable, setVariable, removeVariable]
  );

  return (
    <Provider value={actions}>
      <div id={ROOT_ID} style={style}>
        {children}
      </div>
    </Provider>
  );
};
