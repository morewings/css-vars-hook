[![Build Status](https://travis-ci.com/morewings/css-vars-hook.svg?branch=master)](https://travis-ci.com/morewings/css-vars-hook)
[![dependencies Status](https://david-dm.org/morewings/css-vars-hook/status.svg)](https://david-dm.org/morewings/css-vars-hook)
[![yarn version](https://badge.fury.io/js/css-vars-hook.svg)](https://www.npmjs.com/package/css-vars-hook)
[![npm](https://img.shields.io/npm/dm/css-vars-hook)](http://npm-stats.org/#/css-vars-hook)
[![types included](https://badgen.net/npm/types/tslib)](https://github.com/morewings/css-vars-hook/blob/master/types/index.d.ts)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/css-vars-hook)](https://bundlephobia.com/result?p=css-vars-hook)

# CSS Variables React hook

[css-vars-hook](https://github.com/morewings/css-vars-hook) contains React hooks to set and manipulate CSS custom properties from React component.

## Usage

```shell script
npm install css-vars-hook
```
Or
```shell script
yarn add css-vars-hook
```

## Features

- Set, modify and delete [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) inside React components.
- Apply CSS themes (multiple variables) to any HTMLElement.

## Description

`css-vars-hook` exposes two hooks: `useTheme` and `useVariable`.

`useTheme` applies multiple css properties to given HtmlElement.

```js
import {useTheme} from 'css-vars-hook';

const {
  /* Theme container element setter. <div ref={setRef} /> */
  setRef,
  /* React ref. Use as theme container element getter only. */
  ref,
  /* Object containing style properties {'--foo': 'bar'}. Apply on target element
  to prevent flash of unstyled content during server-side rendering. <div style={style} ref={setRef} /> */
  style,
  /* Get variable value. function(variableName: string) => string */
  getVariable,
  /* Set variable value. function(variableName: string, value: (string|number)) => void */
  setVariable,
  /* Remove variable. function(variableName: string) => void */
  removeVariable
} = useTheme({foo: 'bar'});
```

`useTheme` applies single css property to given HtmlElement.

```js
import {useVariable} from 'css-vars-hook';

const {ref, setRef, style, setVariable, getVariable, removeVariable} = useVariable('foo', 'bar');
```

## Example

```css
/* style.css */
.box {
  background: var(--boxColor);
  width: var(--boxSize);
}
```

```jsx
import {useTheme} from 'css-vars-hook';
import 'style.css';

export const DemoColor = () => {
  const theme = {
    boxColor: 'yellow',
    boxSize: '120px',
  };

  const [colorValue, setColorValue] = useState(theme.boxColor);

  const {setRef, setVariable} = useTheme(theme);

  return (
    <div className="demo-color" ref={setRef}>
      <fieldset>
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
```





