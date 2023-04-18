import type {HTMLAttributes, ReactNode} from 'react';
import {createElement, forwardRef, useEffect, useRef} from 'react';

import {createStyleObject} from '../utils';

export type LocalRootProps<TTheme extends Record<string, string> = Record<string, string>> = JSX.IntrinsicAttributes &
    HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        /** Apply your own CSS class or use styled component styled(LocalRoot) */
        className?: string;
        /** Choose which HTMLElement to render as a root. div is default. */
        as?: string;
        /** Apply initial theme. */
        theme?: TTheme;
        /** Provide theme setter function. */
        setTheme?: (arg0: TTheme) => void;
    };

export const LocalRoot = forwardRef<HTMLElement, LocalRootProps>((props, ref) => {
    // This is needed to fix an error introduced in version 0.6.14.
    // Props were not transported to returned HTMLElement.
    const {children, as = 'div', theme, setTheme = () => {}, ...restProps} = props;

    const initialStyle = useRef(createStyleObject(theme));

    useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    return createElement(as, {...restProps, style: initialStyle.current, ref}, children);
});
