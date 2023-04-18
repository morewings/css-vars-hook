import {useRootContext} from './RootContext';

/**
 * @public
 * React hook to apply multiple CSS variables to theme root and manipulate them.
 * `ThemeType` is defined on project level.
 * @see ThemeType
 * @see https://github.com/morewings/css-vars-hook#type-safety
 */
export const useRootThemePublic = () => {
    const {setTheme, getTheme, setVariable, getVariable, removeVariable} = useRootContext();
    return {
        /** Effect to apply new theme to the application */
        setTheme,
        /** Get current theme */
        getTheme,
        /** Effect to set new variable value within active theme */
        setVariable,
        /** Get variable value within active theme */
        getVariable,
        /** Effect to remove variable within active theme */
        removeVariable,
    };
};
