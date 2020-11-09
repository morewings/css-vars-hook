import React, {useLayoutEffect, useEffect, useState, useReducer} from 'react';
import {getCSSVariable, setCSSVariable} from 'lib/utils';
import {useCssTheme} from 'lib';
import './style.css';

const theme = {shift: 1};
let renderCount = 0;

export const DemoMovement = () => {
  const {setRef, ref} = useCssTheme({theme});
  useEffect(() => {
    setInterval(() => {
      const current = parseInt(getCSSVariable(ref.current)('shift'), 10);
      setCSSVariable(ref.current)('shift', current + 1);
    }, 500);
  }, [ref]);
  useLayoutEffect(() => {
    // eslint-disable-next-line fp/no-mutation
    renderCount += 1;
  });
  return (
    <div className="demo-movement" ref={setRef}>
      <fieldset>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Click the button to move box</label>
        <div className="box" />
        <div className="count">
          Render count: <strong>{renderCount}</strong>
        </div>
      </fieldset>
    </div>
  );
};
