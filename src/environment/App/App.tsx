import React from 'react';

import {DemoRoot} from '../DemoRoot';
import {RootThemeProvider} from '../../lib';
import {DemoLocal} from '../DemoLocal';
import {Style} from '../Examples/Style';
import {Mouse} from '../Examples/Mouse';
import {Rotation3D} from '../Examples/Rotation3D';
// import {Callbacks} from '../Examples/Callbacks';
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
            <Rotation3D />
            <DemoRoot />
            <DemoLocal />
            {/*<Callbacks />*/}
        </div>
    </RootThemeProvider>
);
