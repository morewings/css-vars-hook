import React from 'react';
import type {FC, ReactNode} from 'react';

import classes from './GlobalThemeSwitch.module.css';

export const GlobalThemeSwitch: FC<{children?: ReactNode}> = ({children}) => {
    return <div className={classes.box}>{children}</div>;
};
