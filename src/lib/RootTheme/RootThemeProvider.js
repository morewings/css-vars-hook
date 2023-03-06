import React, {useMemo} from 'react';
import {ROOT_ID} from 'lib/config';
import {RootContext} from './RootContext';
import {useThemeActions} from './useThemeActions';

export const RootThemeProvider = ({children}) => {
  const theme = {
    foo: 1,
  };

  const {setTheme, style, getTheme} = useThemeActions(theme);

  const {Provider} = RootContext;

  const actions = useMemo(() => ({setTheme, style, getTheme}), [setTheme, style, getTheme]);

  return (
    <Provider value={actions}>
      <div id={ROOT_ID} style={style}>
        {children}
      </div>
    </Provider>
  );
};
