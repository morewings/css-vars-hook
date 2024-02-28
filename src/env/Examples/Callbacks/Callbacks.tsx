import type {FC} from 'react';

import {useLocalTheme} from '@/lib';

import classes from './Callbacks.module.css';

export const Callbacks: FC = () => {
    const {LocalRoot} = useLocalTheme();
    return (
        <div className={classes.box}>
            <LocalRoot
                as="button"
                theme={{color: 'red'}}
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
