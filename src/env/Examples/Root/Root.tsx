import {useLayoutEffect} from 'react';

import {useRootTheme} from '@/lib';

import classes from './Root.module.css';

const themeYellow = {
    boxColor: 'yellow',
    borderColor: 'blue',
};

const themePink = {
    boxColor: 'pink',
    borderColor: 'brown',
};

let renderCount = 0;

export const Root = () => {
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

    useLayoutEffect(() => {
        renderCount += 1;
    });

    return (
        <div className={classes.box}>
            <div>
                <fieldset className={classes.controls}>
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
                </fieldset>
                <div className={classes.count}>
                    Reconciliation count: <strong>{renderCount}</strong>
                </div>
            </div>
            <div className={classes.testingArea}>
                <div className={classes.demoComponent} />
            </div>
        </div>
    );
};
