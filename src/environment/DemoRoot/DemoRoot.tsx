import React from 'react';

import {useRootTheme} from '../../lib';
import './style.css';

const themeYellow = {
    boxColor: 'yellow',
    borderColor: 'blue',
};

const themePink = {
    boxColor: 'pink',
    borderColor: 'brown',
};

export const DemoRoot = () => {
    const {setTheme, getTheme, setVariable} = useRootTheme();

    const setThemePink = () => {
        setTheme(themePink);
        console.log('root theme', getTheme());
    };

    const setThemeYellow = () => {
        setTheme(themeYellow);
        console.log('root theme', getTheme());
    };

    const setGreenValue = () => {
        setVariable('borderColor', 'green');
        console.log('root theme', getTheme());
    };

    return (
        <div className="demo-root">
            <fieldset>
                <h3>theme 1</h3>
                <pre>
                    boxColor: &apos;yellow&apos;
                    <br />
                    borderColor: &apos;blue&apos;
                </pre>
                <button type="button" onClick={setThemeYellow}>
                    Set theme 1
                </button>
                <h3>theme 2</h3>
                <pre>
                    boxColor: &apos;pink&apos;
                    <br />
                    borderColor: &apos;brown&apos;
                </pre>
                <button type="button" onClick={setThemePink}>
                    Set theme 2
                </button>
                <br />
                <h3>Set single variable</h3>
                <pre>borderColor: &apos;green&apos;</pre>
                <button type="button" onClick={setGreenValue}>
                    Set --borderColor
                </button>
                <div className="box" />
            </fieldset>
        </div>
    );
};
