import {Fragment, useState, useCallback} from 'react';

import {RootThemeProvider} from '@/lib';
import {Root} from '@/env/examples/Root';
import {DemoLocal} from '@/env/examples/DemoLocal';
import {Style} from '@/env/examples/Style';
import {Mouse} from '@/env/examples/Mouse';
import {Rotation3D} from '@/env/examples/Rotation3D';
import {GlobalThemeSwitch} from '@/env/GlobalThemeSwitch';

import classes from './App.module.css';

const themeA = {
    boxColor: 'violet',
    borderColor: 'purple',
};

const themeB = {
    boxColor: 'violet',
    borderColor: 'purple',
};

const themeC = {
    boxColor: 'teal',
    borderColor: 'gold',
};

export const App = () => {
    const [theme, setTheme] = useState(themeA);

    const setThemeB = useCallback(() => {
        setTheme(themeB);
    }, [setTheme]);

    const setThemeC = useCallback(() => {
        setTheme(themeC);
    }, [setTheme]);

    return (
        <Fragment>
            <GlobalThemeSwitch>
                <button onClick={setThemeB}>Set global theme B</button>
                <button onClick={setThemeC}>Set global theme C</button>
            </GlobalThemeSwitch>
            <RootThemeProvider theme={theme}>
                <div className={classes.container}>
                    <Style />
                    <Mouse />
                    <Rotation3D />
                    <Root />
                    <DemoLocal />
                    {/*<Callbacks />*/}
                </div>
            </RootThemeProvider>
        </Fragment>
    );
};
