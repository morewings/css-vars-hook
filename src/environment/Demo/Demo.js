import React, {useState} from 'react';
import {useCssTheme} from 'lib';
import './Demo.css';

export const Demo = () => {
  const [colorValue, setColorValue] = useState('yellow');
  const theme = {boxColor: 'yellow'};
  const {setRef, setVariable} = useCssTheme({theme});
  return (
    <div className="demo" ref={setRef}>
      <fieldset>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="colorName">Set box color. Needs to be valid CSS color (name, HEX, rgba etc)</label>
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
