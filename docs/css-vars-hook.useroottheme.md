<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [css-vars-hook](./css-vars-hook.md) &gt; [useRootTheme](./css-vars-hook.useroottheme.md)

## useRootTheme variable

React hook to apply multiple CSS variables to theme root and manipulate them. `ThemeType` is defined on project level.

**Signature:**

```typescript
useRootTheme: () => {
    setTheme: (nextTheme: import("css-vars-hook").ThemeType) => void;
    getTheme: () => import("css-vars-hook").ThemeType;
    setVariable: (variableName: string, value: string) => void;
    getVariable: (variableName: string) => string;
    removeVariable: (variableName: string) => void;
}
```