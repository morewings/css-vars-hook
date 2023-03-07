import React, {useLayoutEffect, useEffect, useState} from 'react';

import {useVariable} from '../../lib';
import './style.css';

let renderCount = 0;

export const DemoMovement = () => {
    const {setRef, ref, setVariable, getVariable} = useVariable('shift', '0');
    const [stop, setStop] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            const current = parseInt(getVariable('shift'), 10);
            if (!stop) {
                current < 600 ? setVariable('shift', String(current + 1)) : setVariable('shift', String(current - 600));
            }
        }, 10);
        return () => {
            clearInterval(interval);
        };
    }, [ref, stop, setVariable, getVariable]);
    useLayoutEffect(() => {
        renderCount += 1;
    });
    return (
        <div className="demo-movement" ref={setRef}>
            <fieldset>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label>Click the button to move box</label>
                <button
                    onClick={() => {
                        setStop(prevState => !prevState);
                    }}
                    type="button">
                    {stop ? 'Run' : 'Stop'}
                </button>
                <div className="box" />
                <div className="count">
                    Rerender count: <strong>{renderCount}</strong>
                </div>
            </fieldset>
        </div>
    );
};
