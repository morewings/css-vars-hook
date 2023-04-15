import React from 'react';
import {renderHook} from '@testing-library/react-hooks';

import {RootThemeProvider} from './RootThemeProvider';
import {useRootTheme} from './useRootTheme';

const theme = {
    foo: 'bar',
};

describe('useRootTheme', () => {
    it.skip('renders', () => {
        const {result} = renderHook(() => useRootTheme(), {
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
