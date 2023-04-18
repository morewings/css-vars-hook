import type {FC, HTMLAttributes, ReactNode, CSSProperties} from 'react';
import React, {createElement, forwardRef} from 'react';

export type LocalRootProps = JSX.IntrinsicAttributes &
    HTMLAttributes<HTMLElement> & {
        children?: ReactNode;
        className?: string;
        elementType?: string;
        style?: CSSProperties;
    };

export const LocalRootNew = forwardRef<HTMLElement, LocalRootProps>((props, ref) => {
    // This is needed to fix an error introduced in version 0.6.14.
    // Props were not transported to returned HTMLElement.
    const {children, elementType = 'div', style = {}, ...restProps} = props;
    console.log('ref', ref);
    return createElement(elementType, {...restProps, style, ref}, children);
    // return createElement(elementType, {...restProps, ref: elementRef, style}, children);
});
