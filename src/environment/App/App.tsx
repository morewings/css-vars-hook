import React from 'react';
import {DemoColor} from 'environment/DemoColor';
import {DemoMovement} from 'environment/DemoMovement';
import {DemoRoot} from 'environment/DemoRoot';
import {RootThemeProvider} from 'lib';

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
