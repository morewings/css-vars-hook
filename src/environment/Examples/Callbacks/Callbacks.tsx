import type {FC} from 'react';
import React from 'react';

import {useLocalTheme} from '../../../lib';
import classes from './Callbacks.module.css';

export const Callbacks: FC = () => {
    const {LocalRoot} = useLocalTheme({color: 'red'}, 'button');
    return (
        <div className={classes.box}>
            <LocalRoot
                onFocus={() => {
                    console.log('onFocus');
                }}
                onClick={() => {
                    console.log('hello');
                }}
                className={classes.button}>
                Callbacks
            </LocalRoot>
        </div>
    );
};
