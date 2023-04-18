import React from 'react';
import {renderHook} from '@testing-library/react-hooks';

import {RootThemeProvider} from './RootThemeProvider';
import {useRootThemePublic} from './useRootThemePublic';

const theme = {
    foo: 'bar',
};

describe('useRootThemePublic', () => {
    it.skip('renders', () => {
        const {result} = renderHook(() => useRootThemePublic(), {
            wrapper: ({children}) => <RootThemeProvider theme={theme}>{children}</RootThemeProvider>,
        });
        expect(result.current).toMatchSnapshot();
        // expect(result.current.getTheme()).toBe(theme);
    });

    it.todo('setTheme');
    it.todo('getTheme');
    it.todo('getVariable');
    it.todo('setVariable');
    it.todo('removeVariable');
});
