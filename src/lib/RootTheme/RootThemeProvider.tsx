import type {FC, ReactNode} from 'react';
import React, {useMemo} from 'react';
import type {ThemeType} from 'css-vars-hook';

import {ROOT_ID} from '../config';
import {RootContext} from './RootContext';
import {useRootThemeActions} from './useRootThemeActions';

/**
 * @public
 * Root theme context provider also creates div to contain CSS properties.
 */
export const RootThemeProvider: FC<{children: ReactNode; theme: ThemeType}> = ({children, theme}) => {
    const {setTheme, style, getTheme, getVariable, setVariable, removeVariable} = useRootThemeActions(theme);

    const {Provider} = RootContext;

    const actions = useMemo(
        () => ({setTheme, getTheme, getVariable, setVariable, removeVariable}),
        [setTheme, getTheme, getVariable, setVariable, removeVariable]
    );

    return (
        <Provider value={actions}>
            <div id={ROOT_ID} style={style}>
                {children}
            </div>
        </Provider>
    );
};
