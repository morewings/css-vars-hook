import type {FC, ReactNode} from 'react';
import {useMemo, useEffect} from 'react';
import type {ThemeType} from 'css-vars-hook';

import {ROOT_ID} from '../config';
import type {DataAttributes, LibraryProps} from '../NativeProps';
import {RootContext} from './RootContext';
import {useRootTheme} from './useRootTheme';

/**
 * @public
 */
export type RootThemeProviderProps = DataAttributes &
    LibraryProps & {children: ReactNode; theme: ThemeType};

/**
 * @public
 * Root theme context provider also creates div to contain CSS properties.
 * `ThemeType` is declared globally.
 * @see ThemeType
 * @see https://github.com/morewings/css-vars-hook#type-safety
 */
export const RootThemeProvider: FC<RootThemeProviderProps> = ({
    children,
    theme,
    className,
    id = ROOT_ID,
    ...nativeProps
}) => {
    const {setTheme, style, getTheme, getVariable, setVariable, removeVariable} =
        useRootTheme(theme);

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
            <div {...nativeProps} id={id} className={className} style={style}>
                {children}
            </div>
        </Provider>
    );
};
