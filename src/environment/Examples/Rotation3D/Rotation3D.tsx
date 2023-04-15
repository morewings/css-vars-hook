import type {FC, ChangeEvent} from 'react';
import React, {useCallback, useLayoutEffect} from 'react';

import {useLocalTheme} from '../../../lib';
import {Cube} from './Cube';
import classes from './Rotation3D.module.css';

let renderCount = 0;

export const Rotation3D: FC = () => {
    const initialX = 0;
    const initialY = 0;
    const initialZ = 0;
    const {LocalRoot, setVariable} = useLocalTheme({
        x: `${initialX}deg`,
        y: `${initialY}deg`,
        z: `${initialZ}deg`,
    });
    const handleXChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('x', `${event.target.value}deg`);
        },
        [setVariable]
    );
    const handleYChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('y', `${event.target.value}deg`);
        },
        [setVariable]
    );
    const handleZChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('z', `${event.target.value}deg`);
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
                        Rotate X
                    </label>
                    <input
                        defaultValue={0}
                        min={-180}
                        max={180}
                        id="width-slder"
                        className={classes.input}
                        list="width-values"
                        type="range"
                        onChange={handleXChange}
                    />
                    <datalist id="width-values" className={classes.scale}>
                        <option className={classes.mark} value="-180" label="-180°"></option>
                        <option className={classes.mark} value="-90" label="-90°"></option>
                        <option className={classes.mark} value="0" label="0°"></option>
                        <option className={classes.mark} value="90" label="90°"></option>
                        <option className={classes.mark} value="180" label="180°"></option>
                    </datalist>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="width-slder">
                        Rotate Y
                    </label>
                    <input
                        defaultValue={0}
                        min={-180}
                        max={180}
                        id="width-slder"
                        className={classes.input}
                        list="width-values"
                        type="range"
                        onChange={handleYChange}
                    />
                    <datalist id="width-values" className={classes.scale}>
                        <option className={classes.mark} value="-180" label="-180°"></option>
                        <option className={classes.mark} value="-90" label="-90°"></option>
                        <option className={classes.mark} value="0" label="0°"></option>
                        <option className={classes.mark} value="90" label="90°"></option>
                        <option className={classes.mark} value="180" label="180°"></option>
                    </datalist>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="width-slder">
                        Rotate Z
                    </label>
                    <input
                        defaultValue={0}
                        min={-180}
                        max={180}
                        id="width-slder"
                        className={classes.input}
                        list="width-values"
                        type="range"
                        onChange={handleZChange}
                    />
                    <datalist id="width-values" className={classes.scale}>
                        <option className={classes.mark} value="-180" label="-180°"></option>
                        <option className={classes.mark} value="-90" label="-90°"></option>
                        <option className={classes.mark} value="0" label="0°"></option>
                        <option className={classes.mark} value="90" label="90°"></option>
                        <option className={classes.mark} value="180" label="180°"></option>
                    </datalist>
                </div>
                <div className={classes.count}>Render count: {renderCount}</div>
            </div>
            <LocalRoot className={classes.testingArea}>
                <Cube />
            </LocalRoot>
        </div>
    );
};
