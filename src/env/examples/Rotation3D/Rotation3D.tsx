import type {FC, ChangeEvent, ReactNode} from 'react';
import {useMemo} from 'react';
import {useCallback, useLayoutEffect} from 'react';

import {useLocalTheme} from '@/lib';

import {Cube} from './Cube';
import classes from './Rotation3D.module.css';

let renderCount = 0;

const Control: FC<{
    children: ReactNode;
    label: string;
    inputId: string;
    optionsId: string;
}> = ({children, label, inputId, optionsId}) => {
    return (
        <div className={classes.control}>
            <label className={classes.label} htmlFor={inputId}>
                {label}
            </label>
            {children}
            <datalist id={optionsId} className={classes.scale}>
                <option className={classes.mark} value="-180" label="-180°"></option>
                <option className={classes.mark} value="-90" label="-90°"></option>
                <option className={classes.mark} value="0" label="0°"></option>
                <option className={classes.mark} value="90" label="90°"></option>
                <option className={classes.mark} value="180" label="180°"></option>
            </datalist>
        </div>
    );
};

const initialX = 0;
const initialY = 0;
const initialZ = 0;

export const Rotation3D: FC = () => {
    const {LocalRoot, setVariable} = useLocalTheme();
    const handleXChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('rotateX', `${event.target.value}deg`);
        },
        [setVariable]
    );
    const handleYChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('rotateY', `${event.target.value}deg`);
        },
        [setVariable]
    );
    const handleZChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setVariable('rotateZ', `${event.target.value}deg`);
        },
        [setVariable]
    );

    useLayoutEffect(() => {
        renderCount += 1;
    });

    const theme = useMemo(
        () => ({
            rotateX: `${initialX}deg`,
            rotateY: `${initialY}deg`,
            rotateZ: `${initialZ}deg`,
        }),
        []
    );

    return (
        <div className={classes.box}>
            <div>
                <Control label="Rotate X" inputId="x-slider" optionsId="x-values">
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
                </Control>
                <Control label="Rotate Y" inputId="y-slider" optionsId="y-values">
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
                </Control>
                <Control label="Rotate Z" inputId="z-slider" optionsId="z-values">
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
                </Control>
                <div className={classes.count}>Reconciliation count: {renderCount}</div>
            </div>
            <LocalRoot theme={theme} className={classes.testingArea}>
                <Cube />
            </LocalRoot>
        </div>
    );
};
