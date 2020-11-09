import React, {useLayoutEffect, useState} from 'react';
import {useCssTheme} from 'lib';
import './style.css';

const theme = {boxColor: 'yellow'};
let renderCount = 0;

export const DemoMovement = () => {
  const [colorValue, setColorValue] = useState(theme.boxColor);
  const [shift, setShift] = useState(theme.boxColor);
  const {setRef, setVariable} = useCssTheme({theme});
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
            setVariable('boxColor', colorValue);
          }}
          type="button">
          Move right
        </button>
        <button
          onClick={() => {
            setVariable('boxColor', colorValue);
          }}
          type="button">
          Stop
        </button>
        <div className="box" />
        <div className="count">
          Render count: <strong>{renderCount}</strong>
        </div>
      </fieldset>
    </div>
  );
};
