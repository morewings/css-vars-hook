import type {FC, MouseEvent} from 'react';
import React, {useCallback, useState, useRef} from 'react';

import {useLocalTheme} from '../../../lib';
import classes from './Mouse.module.css';
import image from './mouse.jpg';

export const Mouse: FC = () => {
    const trackerRef = useRef<HTMLImageElement>();
    const {LocalRoot, ref, setTheme} = useLocalTheme({left: '0px', top: '0px'});

    const handleMove = useCallback(
        (event: MouseEvent) => {
            const offsetTop = Math.min(
                event.clientY - ref.current.getBoundingClientRect().top,
                ref.current.offsetHeight - trackerRef.current.offsetHeight
            );
            const offsetLeft = Math.min(
                event.clientX - ref.current.getBoundingClientRect().left,
                ref.current.offsetWidth - trackerRef.current.offsetWidth
            );
            setTheme({left: `${offsetLeft}px`, top: `${offsetTop}px`});
        },
        [setTheme, ref, trackerRef]
    );
    return (
        <div className={classes.box}>
            <LocalRoot onMouseMove={handleMove} className={classes.trackingArea}>
                <img ref={trackerRef} src={image as string} className={classes.tracker} title="Happy cursor friend" />
            </LocalRoot>
        </div>
    );
};
