import React, {useLayoutEffect, useEffect, useState} from 'react';
import {useCssTheme} from 'lib';
import './style.css';

const theme = {shift: 1};
let renderCount = 0;

export const DemoMovement = () => {
  const {setRef, ref, setVariable, getVariable} = useCssTheme({theme});
  const [stop, setStop] = useState('false');
  useEffect(() => {
    const interval = setInterval(() => {
      const current = parseInt(getVariable('shift'), 10);
      if (!stop) {
        current < 600 ? setVariable('shift', current + 1) : setVariable('shift', current - 600);
      }
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [ref, stop]);
  useLayoutEffect(() => {
    // eslint-disable-next-line fp/no-mutation
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
          Render count: <strong>{renderCount}</strong>
        </div>
      </fieldset>
    </div>
  );
};
