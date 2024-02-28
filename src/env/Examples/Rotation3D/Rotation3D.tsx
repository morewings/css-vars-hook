import type {FC, ChangeEvent} from 'react';
import {useCallback, useLayoutEffect} from 'react';

import {useLocalTheme} from '@/lib';

import {Cube} from './Cube';
import classes from './Rotation3D.module.css';

let renderCount = 0;

export const Rotation3D: FC = () => {
    const initialX = 0;
    const initialY = 0;
    const initialZ = 0;
    const {LocalRoot, setVariable} = useLocalTheme();
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
                    <label className={classes.label} htmlFor="x-slider">
                        Rotate X
                    </label>
                    <input
                        defaultValue={0}
                        min={-180}
                        max={180}
                        id="x-slider"
                        className={classes.input}
                        list="x-values"
                        type="range"
                        onChange={handleXChange}
                    />
                    <datalist id="x-values" className={classes.scale}>
                        <option className={classes.mark} value="-180" label="-180°"></option>
                        <option className={classes.mark} value="-90" label="-90°"></option>
                        <option className={classes.mark} value="0" label="0°"></option>
                        <option className={classes.mark} value="90" label="90°"></option>
                        <option className={classes.mark} value="180" label="180°"></option>
                    </datalist>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="y-slider">
                        Rotate Y
                    </label>
                    <input
                        defaultValue={0}
                        min={-180}
                        max={180}
                        id="y-slider"
                        className={classes.input}
                        list="y-values"
                        type="range"
                        onChange={handleYChange}
                    />
                    <datalist id="y-values" className={classes.scale}>
                        <option className={classes.mark} value="-180" label="-180°"></option>
                        <option className={classes.mark} value="-90" label="-90°"></option>
                        <option className={classes.mark} value="0" label="0°"></option>
                        <option className={classes.mark} value="90" label="90°"></option>
                        <option className={classes.mark} value="180" label="180°"></option>
                    </datalist>
                </div>
                <div className={classes.control}>
                    <label className={classes.label} htmlFor="z-slider">
                        Rotate Z
                    </label>
                    <input
                        defaultValue={0}
                        min={-180}
                        max={180}
                        id="z-slider"
                        className={classes.input}
                        list="z-values"
                        type="range"
                        onChange={handleZChange}
                    />
                    <datalist id="z-values" className={classes.scale}>
                        <option className={classes.mark} value="-180" label="-180°"></option>
                        <option className={classes.mark} value="-90" label="-90°"></option>
                        <option className={classes.mark} value="0" label="0°"></option>
                        <option className={classes.mark} value="90" label="90°"></option>
                        <option className={classes.mark} value="180" label="180°"></option>
                    </datalist>
                </div>
                <div className={classes.count}>Reconciliation count: {renderCount}</div>
            </div>
            <LocalRoot
                theme={{
                    rotateX: `${initialX}deg`,
                    rotateY: `${initialY}deg`,
                    rotateZ: `${initialZ}deg`,
                }}
                className={classes.testingArea}>
                <Cube />
            </LocalRoot>
        </div>
    );
};
