import React, {useState} from 'react';
import {useCssTheme} from 'lib';
import './style.css';

const theme = {boxColor: 'yellow'};

export const DemoMovement = () => {
  const [colorValue, setColorValue] = useState(theme.boxColor);
  const {setRef, setVariable} = useCssTheme({theme});
  return (
    <div className="demo" ref={setRef}>
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
      </fieldset>
    </div>
  );
};
