import React, {useState, useLayoutEffect} from 'react';
import {useTheme} from 'lib';
import './style.css';

const theme = {boxColor: 'yellow'};

let renderCount = 0;

export const DemoColor = () => {
  const [colorValue, setColorValue] = useState(theme.boxColor);
  const {setRef, setVariable} = useTheme(theme);

  useLayoutEffect(() => {
    // eslint-disable-next-line fp/no-mutation
    renderCount += 1;
  });

  return (
    <div className="demo-color" ref={setRef}>
      <fieldset>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="colorName">Set box color. Needs to be a valid CSS color (name, HEX, rgba etc).</label>
        <input
          value={colorValue}
          id="colorName"
          type="text"
          onChange={e => {
            setColorValue(e.target.value);
          }}
        />
        <button
          onClick={() => {
            setVariable('boxColor', colorValue);
          }}
          type="button">
          Set
        </button>
        <div className="box" />
        <div className="count">
          Render count: <strong>{renderCount}</strong>
        </div>
      </fieldset>
    </div>
  );
};
