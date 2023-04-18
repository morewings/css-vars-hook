import type {FC, HTMLAttributes, ReactNode, CSSProperties} from 'react';
import {createElement, forwardRef, useEffect, useRef} from 'react';

import {createStyleObject} from '../utils';

export type LocalRootProps<TTheme extends Record<string, string> = Record<string, string>> = JSX.IntrinsicAttributes &
    HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        className?: string;
        elementType?: string;
        theme?: TTheme;
        setTheme?: (arg0: TTheme) => void;
    };

export const LocalRootNew = forwardRef<HTMLElement, LocalRootProps>((props, ref) => {
    // This is needed to fix an error introduced in version 0.6.14.
    // Props were not transported to returned HTMLElement.
    const {children, elementType, theme, setTheme = () => {}, ...restProps} = props;

    // useEffect(() => {
    //     console.log('foo changed', foo);
    // }, [foo]);

    const initialStyle = useRef(createStyleObject(theme));

    useEffect(() => {
        setTheme(theme);
    }, [theme, setTheme]);

    return createElement(elementType, {...restProps, style: initialStyle.current, ref}, children);
    // return createElement(elementType, {...restProps, ref: elementRef, style}, children);
});
