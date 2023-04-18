import React, {useLayoutEffect, useState} from 'react';

import {useLocalTheme} from '../../lib';
import classes from './DemoLocal.module.css';

const themeIvory = {boxColor: 'ivory', borderColor: 'orange'};

const themeNeon = {
    boxColor: 'black',
    borderColor: 'magenta',
};

let renderCount = 0;

export const DemoLocal = () => {
    const [externalTheme, setExternalTheme] = useState(themeIvory);

    const {setTheme, getTheme, LocalRoot, getVariable, setVariable} = useLocalTheme(themeIvory);

    const setThemeIvory = () => {
        setTheme(themeIvory);
        console.log('root theme', getTheme());
        console.log('boxColor', getVariable('boxColor'));
    };

    const setExternal = () => {
        setExternalTheme({
            boxColor: 'black',
            borderColor: 'magenta',
        });
    };

    const setThemeNeon = () => {
        setTheme(themeNeon);
        console.log('root theme', getTheme());
        console.log('boxColor', getVariable('boxColor'));
    };

    const setTurquoiseValue = () => {
        setVariable('borderColor', 'turquoise');
        console.log('root theme', getTheme());
        console.log('borderColor', getVariable('borderColor'));
    };

    useLayoutEffect(() => {
        renderCount += 1;
    });

    return (
        <div className={classes.box}>
            <div>
                <fieldset className={classes.controls}>
                    <h3>theme 1</h3>
                    <pre>
                        boxColor: &apos;ivory&apos;
                        <br />
                        borderColor: &apos;orange&apos;
                    </pre>
                    <button type="button" onClick={setExternal}>
                        Set external theme
                    </button>
                    <br />
                    <button type="button" onClick={setThemeIvory}>
                        Set theme 1
                    </button>
                    <h3>theme 2</h3>
                    <pre>
                        boxColor: &apos;black&apos;
                        <br />
                        borderColor: &apos;magenta&apos;
                    </pre>
                    <button type="button" onClick={setThemeNeon}>
                        Set theme 2
                    </button>
                    <br />
                    <h3>Set single variable</h3>
                    <pre>borderColor: &apos;turquoise&apos;</pre>
                    <button type="button" onClick={setTurquoiseValue}>
                        Set --borderColor
                    </button>

                    <div className={classes['count']}>
                        Rerender count: <strong>{renderCount}</strong>
                    </div>
                </fieldset>
            </div>
            <div className={classes.testingArea}>
                <LocalRoot theme={externalTheme} className={classes.demoComponent} />
            </div>
        </div>
    );
};
