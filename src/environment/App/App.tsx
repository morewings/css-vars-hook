import React from 'react';

import {DemoMovement} from '../DemoMovement';
import {DemoRoot} from '../DemoRoot';
import {RootThemeProvider} from '../../lib';
import {DemoColor} from '../DemoColor';
import classes from './App.module.css';

export const App = () => (
    <RootThemeProvider
        theme={{
            boxColor: 'purple',
            borderColor: 'violet',
        }}>
        <div className={classes.container}>
            <DemoColor />
            <DemoMovement />
            <DemoRoot />
        </div>
    </RootThemeProvider>
);