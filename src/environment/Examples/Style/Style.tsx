import type {ChangeEvent, FC} from 'react';
import React, {useCallback, useLayoutEffect} from 'react';

import {useLocalTheme} from '../../../lib';
import classes from './Style.module.css';

let renderCount = 0;

export const Style: FC = () => {
    const initialWidth = 100;
    const initialHeight = 100;
    const initialRadius = 0;
    const initialColor = '#FFC0CB';
    const {LocalRoot, setVariable} = useLocalTheme({
        width: `${initialWidth}px`,
        height: `${initialHeight}px`,
        radius: `${initialRadius}px`,
        color: initialColor,
    });
    const handleWidthChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('width', `${event.target.value}px`);
        },
        [setVariable]
    );

    const handleHeightChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('height', `${event.target.value}px`);
        },
        [setVariable]
    );

    const handleRadiusChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('radius', `${event.target.value}px`);
        },
        [setVariable]
    );

    const handleColorChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('color', event.target.value);
        },
        [setVariable]
    );

    useLayoutEffect(() => {
        renderCount += 1;
    });

    return (
        <div className={classes.box}>
            <div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="width-slder">
                        Change width
                    </label>
                    <input
                        defaultValue={initialWidth}
                        min={1}
                        max={200}
                        id="width-slder"
                        className={classes.input}
                        list="width-values"
                        type="range"
                        onChange={handleWidthChange}
                    />
                    <datalist id="width-values" className={classes.scale}>
                        <option className={classes.mark} value="1" label="1"></option>
                        <option className={classes.mark} value="50" label="50"></option>
                        <option className={classes.mark} value="100" label="100"></option>
                        <option className={classes.mark} value="150" label="150"></option>
                        <option className={classes.mark} value="200" label="200"></option>
                    </datalist>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="height-slder">
                        Change height
                    </label>
                    <input
                        defaultValue={initialHeight}
                        min={1}
                        max={200}
                        id="height-slder"
                        className={classes.input}
                        list="height-values"
                        type="range"
                        onChange={handleHeightChange}
                    />
                    <datalist id="height-values" className={classes.scale}>
                        <option className={classes.mark} value="1" label="1"></option>
                        <option className={classes.mark} value="50" label="50"></option>
                        <option className={classes.mark} value="100" label="100"></option>
                        <option className={classes.mark} value="150" label="150"></option>
                        <option className={classes.mark} value="200" label="200"></option>
                    </datalist>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="radius-slder">
                        Change border-radius
                    </label>
                    <input
                        defaultValue={initialRadius}
                        min={0}
                        max={100}
                        id="radius-slder"
                        className={classes.input}
                        list="radius-values"
                        type="range"
                        onChange={handleRadiusChange}
                    />
                    <datalist id="radius-values" className={classes.scale}>
                        <option className={classes.mark} value="0" label="0"></option>
                        <option className={classes.mark} value="25" label="25"></option>
                        <option className={classes.mark} value="50" label="50"></option>
                        <option className={classes.mark} value="75" label="75"></option>
                        <option className={classes.mark} value="100" label="100"></option>
                    </datalist>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="color-picker">
                        Change color
                    </label>
                    <input
                        id="color-picker"
                        onChange={handleColorChange}
                        className={classes.input}
                        type="color"
                        defaultValue={initialColor}
                    />
                </div>
                <div className={classes.count}>Render count: {renderCount}</div>
            </div>
            <LocalRoot className={classes.testingArea}>
                <div className={classes.demo}></div>
            </LocalRoot>
        </div>
    );
};
