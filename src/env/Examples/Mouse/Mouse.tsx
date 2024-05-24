import type {FC, MouseEvent} from 'react';
import {useMemo} from 'react';
import {useCallback, useLayoutEffect, useRef} from 'react';

import {useLocalTheme} from '@/lib';

import classes from './Mouse.module.css';
import image from './mouse.jpg';

let renderCount = 0;

export const Mouse: FC = () => {
    const trackerRef = useRef<HTMLImageElement>(null);
    const {LocalRoot, ref, setTheme} = useLocalTheme();

    const handleMove = useCallback(
        (event: MouseEvent) => {
            const offsetTop = Math.min(
                // calculate actual coordinate
                event.clientY - ref.current!.getBoundingClientRect().top,
                // calculate actual coordinate
                ref.current!.offsetHeight - trackerRef.current!.offsetHeight
            );
            const offsetLeft = Math.min(
                event.clientX - ref.current!.getBoundingClientRect().left,
                ref.current!.offsetWidth - trackerRef.current!.offsetWidth
            );
            setTheme({
                left: `${Math.floor(offsetLeft)}px`,
                top: `${Math.floor(offsetTop)}px`,
            });
        },
        [setTheme, ref, trackerRef]
    );

    useLayoutEffect(() => {
        renderCount += 1;
    });

    const theme = useMemo(() => ({left: '0px', top: '0px'}), []);

    return (
        <div className={classes.box}>
            <LocalRoot
                theme={theme}
                onMouseMove={handleMove}
                className={classes.trackingArea}>
                <img
                    ref={trackerRef}
                    src={image as string}
                    className={classes.tracker}
                    alt="Happy cursor friend"
                    title="Happy cursor friend"
                />
            </LocalRoot>
            <div className={classes.count}>Reconciliation count: {renderCount}</div>
        </div>
    );
};
