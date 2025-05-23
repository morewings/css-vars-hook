[![Node.js CI](https://github.com/morewings/css-vars-hook/actions/workflows/merge-jobs.yml/badge.svg)](https://github.com/morewings/css-vars-hook/actions/workflows/merge-jobs.yml)
[![yarn version](https://badge.fury.io/js/css-vars-hook.svg)](https://www.npmjs.com/package/css-vars-hook)
[![npm](https://img.shields.io/npm/dm/css-vars-hook)](https://www.npmcharts.com/compare/css-vars-hook?interval=7)
[![types included](https://img.shields.io/github/package-json/types/morewings/css-vars-hook)](https://github.com/morewings/css-vars-hook)
[![zero dependencies](https://img.shields.io/badge/zero-dependencies-teal)](https://github.com/morewings/css-vars-hook)
[![npm bundle size](https://deno.bundlejs.com/badge?bundle&q=css-vars-hook@latest&config={"esbuild":{"external":["react","react-dom"]}})](https://bundlejs.com/?q=css-vars-hook@latest&config={"esbuild":{"external":["react","react-dom"]}})
[![Maintainability](https://api.codeclimate.com/v1/badges/6e529032595f49447227/maintainability)](https://codeclimate.com/github/morewings/css-vars-hook/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6e529032595f49447227/test_coverage)](https://codeclimate.com/github/morewings/css-vars-hook/test_coverage)

# CSS Variables React hook

[![NPM library Create React App template logo](./design/image.jpg)](#)

[css-vars-hook](https://github.com/morewings/css-vars-hook) contains React hooks to set and manipulate CSS custom properties (variables).


[Demo](https://morewings.github.io/css-vars-hook/)

[dev.to article](https://dev.to/morewings/how-to-use-css-vars-hook-to-manipulate-css-custom-properties-in-react-38dg)

## Highlights

- **CSS Variables in React**: manage your component design in a fast and convenient way.
- **Dynamic Theming**: create and manage themes for your application. Apply multiple CSS variables to any HTML element.
- **TypeScript Support**: The library is written in TypeScript, offering type safety and enhancing developer experience.
- **Zero Dependencies**: It operates independently without the need for additional libraries, ensuring a lightweight integration.
- **Performance**: The hook is optimized for performance, with a small footprint that does not impact application speed.

## Install

```shell script
npm install css-vars-hook
```

## Usage

`css-vars-hook` exposes two hooks: `useRootTheme`, `useLocalTheme`. Both of them provide developer a bridge between **React Component state** and **CSS Custom Properties**.

## `useRootTheme`

`useRootTheme` applies application level themes. API consists of two elements: the hook itself and `RootThemeProvider` component which acts as `:root` selector. Directly applying theme to the `:root` is not compatible with Server side rendering (SSR).

## Manipulate theme

### Set up

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

### Memoize theme

To avoid unnecessary reconciliations and re-renders theme object has to **preserve referential equality** during component lifecycle.

#### Wrong examples

Arbitrary objects are recreated every time React component reconciles. Avoid this when defining theme object.

```tsx
// Don't do this!!!
const Component: FC = () => {
    //...
    const theme = {
        foo: 'bar'
    }

    return <RootThemeProvider theme={theme}>{/*...*/}</RootThemeProvider>
}
```

```tsx
// Don't do this!!!
const Component: FC = () => {
    //...
    return <RootThemeProvider theme={{ foo: 'bar' }}>{/*...*/}</RootThemeProvider>
}
```

#### Correct examples

Set theme object externally to Component or wrap with `useMemo`.

```tsx
// Correct!
const theme = {
    foo: 'bar'
}

const Component: FC = () => {
    return <RootThemeProvider theme={theme}>{/*...*/}</RootThemeProvider>
}
```

```tsx
// Correct! Theme will preserve until foo property change
const Component: FC<{foo: string}> = ({foo}) => {

    const theme = useMemo(() => ({foo}), [foo])

    return <RootThemeProvider theme={theme}>{/*...*/}</RootThemeProvider>
}
```

### Change theme

Theme changing methods (`setTheme`, `setVariable`, `removeVariable`) are implemented as **effects**. They will apply after component re-render. You'll have to wrap the side effect with `useEffect` or put in inside callback to move it out of the rendering calculation.
```jsx
// Component.jsx
import React, { useEffect, useCallback } from "react";
import { useRootTheme } from 'css-vars-hook';

const theme = {
  boxColor: 'red',
  borderColor: 'green',
}

const Component = () => {
  const { setTheme, setVariable, removeVariable } = useRootTheme();

  // Set theme value inside useEffect hook
  useEffect(() => {
    // Theme changing effects can be applied like this. The change will happen after render.
    setTheme(theme);
  }, [theme, setTheme])

  // Set theme value inside callback
  const handleVariable = useCallback(() => {
    setVariable('boxColor', 'pink');
  }, [])

  return <button onClick={handleVariable}>Change variable</button>;
}
```

### Caveats

```jsx
//...
const Component = () => {
  const { setTheme } = useRootTheme();

  // This will not work!
  setTheme(theme)

  //...
}
```

The reason this code isn’t correct is that it tries to do something with the DOM node during rendering. In React, rendering should be a pure calculation of JSX and should not contain side effects like modifying the DOM. Moreover, when Component is called for the first time, its DOM does not exist yet, so there is no theme container to operate with.


### Type safety

Developers can provide theme type to `useRootTheme` hook as a TypeScript Generic.

```tsx
import { FC } from "react";

type Theme = {
    boxColor: 'yellow' | 'blue';
    borderColor: string;
};

const themeYellow: Theme = {
    boxColor: 'yellow',
    borderColor: 'blue',
};

const Component: FC = () => {
    const {setTheme, getTheme, setVariable} = useRootTheme<Theme>();
    const doSomething = () => {
        // theme value will be properly typed this way
        console.log('root theme', getTheme().boxColor);
    };
    //...
}
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

## `useLocalTheme`

`useLocalTheme` applies theme locally to the wrapped React components.

### Set up a local theme

In order to set local theme you need to wrap your component with `LocalRoot` component which is returned by `useLocalTheme` hook.

```jsx
import { useLocalTheme } from 'css-vars-hook';
import { useCallback } from "react";

const theme = { boxColor: 'yellow' };
const darkTheme = {boxColor: 'darkYellow'};

const Component = () => {
  const { LocalRoot, setTheme } = useLocalTheme();
  const setDarkMode = useCallback(() => {
    setTheme(darkTheme)
  }, []);
  return <LocalRoot theme={theme}>{/*...*/}</LocalRoot>
}
```

Outside different wrapping strategies this hook is similar to `useRootTheme`.

### Customize `LocalRoot` element

By default `LocalRoot` is rendered as a `div` HTMLElement. You can provide custom element type (`button`, `span`, e. t. c.) by changing `as` prop of `LocalRoot`.

```jsx
import {useLocalTheme} from 'css-vars-hook';

const theme = {boxColor: 'yellow'};
const darkTheme = {boxColor: 'darkYellow'};

const Component = () => {
    const {LocalRoot: Button, setTheme} = useLocalTheme();
    const setDarkMode = useCallback(() => {
      setTheme(darkTheme)
    }, [])
    return (
      <Button
        theme={theme}
        as="button"
        onClick={setDarkMode}>
        Set dark mode
      </Button>
    )
}
```

### Type safety

Local theme type is inferred from corresponding `LocalRoot` prop.





