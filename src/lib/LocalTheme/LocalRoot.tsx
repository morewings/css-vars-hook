import type {HTMLAttributes, ReactNode} from 'react';
import {createElement, forwardRef, useEffect, useMemo} from 'react';
import type {ThemeType} from 'css-vars-hook';

import {createStyleObject} from '@/lib/utils';
import type {DataAttributes, LibraryProps} from '@/lib/NativeProps';

/**
 * @public
 */
export type LocalRootProps = DataAttributes &
    LibraryProps &
    HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        /** Choose which HTMLElement to render as a root. div is default. */
        as?: string;
        /** Apply initial theme. */
        theme?: ThemeType;
        /** Provide theme setter function. */
        setTheme?: (arg0: ThemeType) => void;
    };

export const LocalRoot = forwardRef<HTMLElement, LocalRootProps>((props, ref) => {
    // This is needed to fix an error introduced in version 0.6.14.
    // Props were not transported to returned HTMLElement.
    const {children, as = 'div', theme = {}, setTheme = () => {}, ...restProps} = props;

    const initialStyle = useMemo(() => createStyleObject(theme), [theme]);

    useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    return createElement(as, {...restProps, style: initialStyle, ref}, children);
});

LocalRoot.displayName = 'LocalRoot';
