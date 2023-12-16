import type {FC, ReactNode} from 'react';
import React, {useMemo, useEffect} from 'react';
import type {ThemeType} from 'css-vars-hook';

import {ROOT_ID} from '../config';
import {RootContext} from './RootContext';
import {useRootTheme} from './useRootTheme';

/**
 * @public
 * Root theme context provider also creates div to contain CSS properties.
 * `ThemeType` is declared globally.
 * @see ThemeType
 * @see https://github.com/morewings/css-vars-hook#type-safety
 */
export const RootThemeProvider: FC<{children: ReactNode; theme: ThemeType; className?: string}> = ({
    children,
    theme,
    className,
}) => {
    const {setTheme, style, getTheme, getVariable, setVariable, removeVariable} = useRootTheme(theme);

    const {Provider} = RootContext;

    const actions = useMemo(
        () => ({setTheme, getTheme, getVariable, setVariable, removeVariable}),
        [setTheme, getTheme, getVariable, setVariable, removeVariable]
    );

    useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    return (
        <Provider value={actions}>
            <div id={ROOT_ID} className={className} style={style}>
                {children}
            </div>
        </Provider>
    );
};
