import React from 'react';

import {DemoRoot} from '../DemoRoot';
import {RootThemeProvider} from '../../lib';
import {DemoLocal} from '../DemoLocal';
import {Style} from '../Examples/Style';
import {Mouse} from '../Examples/Mouse';
import classes from './App.module.css';

export const App = () => (
    <RootThemeProvider
        theme={{
            boxColor: 'purple',
            borderColor: 'violet',
        }}>
        <div className={classes.container}>
            <Style />
            <Mouse />
            <DemoRoot />
            <DemoLocal />
        </div>
    </RootThemeProvider>
);
