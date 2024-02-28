import {useContext, createContext} from 'react';

import type {HookInterface} from './HookInterfaceType';

export const RootContext = createContext<HookInterface>({
    setTheme: () => {},
    getTheme: () => ({}),
    setVariable: () => {},
    getVariable: () => '',
    removeVariable: () => {},
});

export const useRootContext = () => useContext<HookInterface>(RootContext);
