import React, {useState} from 'react';
import {useRootTheme} from 'lib';
import './style.css';

const themeFoo = {boxColor: 'yellow'};

const themeBar = {boxColor: 'pink'};

export const DemoRoot = () => {
  const [theme, setTheme] = useState(themeFoo);
  const {setRootVariable} = useRootTheme(theme);

  const setThemeFoo = () => {
    setTheme(themeFoo);
  };

  const setThemeBar = () => {
    setTheme(themeBar);
  };

  const setGreenValue = () => {
    setRootVariable('boxColor', 'green');
  };

  return (
    <div className="demo-root">
      <fieldset>
        <h3>theme 1</h3>
        <pre>boxColor: &apos;yellow&apos;</pre>
        <button type="button" onClick={setThemeFoo}>
          Set theme 1
        </button>
        <h3>theme 2</h3>
        <pre>boxColor: &apos;pink&apos;</pre>
        <button type="button" onClick={setThemeBar}>
          Set theme 2
        </button>
        <br />
        <button type="button" onClick={setGreenValue}>
          Set green
        </button>
        <div className="box" />
      </fieldset>
    </div>
  );
};
