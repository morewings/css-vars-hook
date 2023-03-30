import React from 'react';

import {DemoMovement} from '../DemoMovement';
import {DemoRoot} from '../DemoRoot';
import {RootThemeProvider} from '../../lib';
import {DemoColor} from '../DemoColor';
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
            <DemoColor />
            {/*<DemoMovement />*/}
            <DemoRoot />
            <DemoLocal />
            <Style />
            <Mouse />
        </div>
    </RootThemeProvider>
);
