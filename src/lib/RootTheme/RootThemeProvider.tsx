import type {FC, ReactNode} from 'react';
import React, {useMemo} from 'react';

import {ROOT_ID} from '../config';
import type {ThemeType} from '../ThemeType';
import {RootContext} from './RootContext';
import {useRootThemeActions} from './useRootThemeActions';

export type ProviderProps = {
    children: ReactNode;
    theme: ThemeType;
};

export const RootThemeProvider: FC<ProviderProps> = ({children, theme}) => {
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
