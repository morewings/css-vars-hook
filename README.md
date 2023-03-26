[![Node.js CI](https://github.com/morewings/css-vars-hook/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/morewings/css-vars-hook/actions/workflows/merge-jobs.yml)
[![yarn version](https://badge.fury.io/js/css-vars-hook.svg)](https://www.npmjs.com/package/css-vars-hook)
[![npm](https://img.shields.io/npm/dm/css-vars-hook)](http://npm-stats.org/#/css-vars-hook)
[![types included](https://badgen.net/npm/types/tslib)](https://github.com/morewings/css-vars-hook)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/css-vars-hook)](https://bundlephobia.com/result?p=css-vars-hook)

# CSS Variables React hook

[css-vars-hook](https://github.com/morewings/css-vars-hook) contains React hooks to set and manipulate CSS custom properties from React component.

[API docs](https://github.com/morewings/css-vars-hook/blob/master/docs/css-vars-hook.md)

[Demo](https://morewings.github.io/css-vars-hook/)

[dev.to article](https://dev.to/morewings/how-to-use-css-vars-hook-to-manipulate-css-custom-properties-in-react-38dg)

## Features

- Set, modify and delete [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) inside React components.
- Set up and manage CSS themes for the whole application.
- Apply CSS themes (multiple variables) to any HTMLElement.
- Written in Typescript.
- Zero dependencies.
- Small and fast.

## Install

```shell script
npm install css-vars-hook
```
Or
```shell script
yarn add css-vars-hook
```

## Usage

`css-vars-hook` exposes two hooks: `useRootTheme`, `useLocalTheme`.

## `useRootTheme`

`useRootTheme` applies application level themes. API consists of two elements: the hook itself and `RootThemeProvider` component which acts as `:root` selector. Directly applying theme to the `:root` is not compatible with Server side rendering (SSR). See [API docs](https://github.com/morewings/css-vars-hook/blob/master/docs/css-vars-hook.useroottheme.md).

### Set up a global theme

In order to set global theming you need to wrap your application with `RootThemeProvider` on highest possible level.

```jsx
// App.js
import React from 'react';
import {RootThemeProvider} from 'css-vars-hook';

// Theme object contains dictionary of CSS variables you will use later in your application
const theme = {
    boxColor: 'purple',
    borderColor: 'violet',
}

export const App = () => (
    <RootThemeProvider
        theme={theme}>
        {/*...*/}
    </RootThemeProvider>
);
```

### Consume the theme data

CSS variables set by `RootThemeProvider` are available globally across all application.

#### In CSS

```postcss
// Component.css

.box {
    background: var(--boxColor);
    border: 1px solid var(--borderColor)
}
```

#### In JS

```js
import {useRootTheme} from 'css-vars-hook';

const {
    /** Get current theme */
    getTheme,
    /** Get variable value within active theme */
    getVariable,
} = useRootTheme();

console.log(getVariable('boxColor')) // => 'purple'
console.log(getTheme()) // => theme object
```

### Change theme

Themes can be changed dynamically during application runtime. `useRootTheme` hook exposes set of effects to change the theme.

Theme changing methods (`setTheme`, `setVariable`, `removeVariable`) are implemented as an **effect**, thus they don't trigger React reconciliation and rerender. Also, this allows to be SSR compatible and prevent Flash of unstyled content (FOUC).

```jsx
// Component.jsx
import React, {useEffect, Fragment} from 'react';
import {useRootTheme} from 'css-vars-hook';

const Component = () => {
    const theme = {
        boxColor: 'red',
        borderColor: 'green',
    }
    const {setTheme, setVariable, removeVariable} = useRootTheme();

    // Wrong
    // This will not work! setTheme is a side effect and will not be available during render stage
    setTheme(theme);

    // Correct
    useEffect(() => {
        // Theme changing effects can be applied like this. The change will happen after render.
        setTheme(theme);
        setVariable('boxColor', 'pink');
    }, [theme, setTheme])

    // Or like this. The change(s) will happen when user clicks the button.
    const handleTheme = () => {
        setTheme(theme);
    }
    const handleVariable = () => {
        setVariable('boxColor', 'pink');
    }

    return (
        <Fragment>
            <button onClick={handleTheme}>Change theme</button>
            <button onClick={handleTheme}>Change theme</button>
        </Fragment>
    )
}
```

## `useLocalTheme`

`useLocalTheme` applies themes one contained by `LocalRoot` component it outputs.

### Set up a local theme

In order to set local theme you need to wrap your component with `LocalRoot` component which is returned by `useLocalThemeHook`.

```jsx
import {useLocalTheme} from 'css-vars-hook';

const Component = () => {
    const {LocalRoot, setTheme} = useLocalTheme({boxColor: 'yellow'});
    const setDarkMode = setTheme({boxColor: 'darkYellow'});
    return <LocalRoot>{/*...*/}</LocalRoot>
}
```

Outside different wrapping strategies this hook is similar to `useRootTheme`.

### Customize `LocalRoot` element

By default `LocalRoot` is rendered as a `div` HTMLElement. You can provide custom element type (`button`, `span`, e. t. c.) as a second parameter to the hook.

```jsx
import {useLocalTheme} from 'css-vars-hook';

const Component = () => {
    const {LocalRoot: Button, setTheme} = useLocalTheme({boxColor: 'yellow'}, 'button');
    const setDarkMode = setTheme({boxColor: 'darkYellow'});
    return <Button onClick={() => {setDarkMode()}}>Set dark mode</Button>
}
```

## `useTheme` **DEPRECATED**

`useTheme` applies multiple CSS properties to given `HTMLElement`. See [API docs](https://github.com/morewings/css-vars-hook/blob/master/docs/css-vars-hook.uselocaltheme.md).

```js
import {useTheme} from 'css-vars-hook';

const {
  /* Theme container element setter. <div ref={setRef} /> */
  setRef,
  /* React ref. Use as theme container element getter only. */
  ref,
  /* Object containing style properties {'--foo': 'bar'}. Apply on target element
  to prevent flash of unstyled content during server-side rendering.
  <div style={style} ref={setRef} /> */
  style,
  /* Get variable value. function(variableName: string) => string */
  getVariable,
  /* Set variable value. function(variableName: string, value: (string|number)) => void */
  setVariable,
  /* Remove variable. function(variableName: string) => void */
  removeVariable
} = useTheme({foo: 'bar'});
```

## `useVariable` **DEPRECATED**

`useVariable` applies single CSS property to given `HTMLElement`.

```js
import {useVariable} from 'css-vars-hook';

const {
  ref,
  setRef,
  style,
  setVariable,
  getVariable,
  removeVariable
} = useVariable('foo', 'bar');
```





