import type {Context} from 'react';
import {useContext, createContext} from 'react';

import type {Theme} from '@/lib/ThemeType.ts';

import type {HookInterface} from './HookInterfaceType';

export const RootContext = createContext({
    setTheme: () => {},
    getTheme: () => ({}),
    setVariable: () => {},
    getVariable: () => '',
    removeVariable: () => {},
} as HookInterface<Theme>);

export const useRootContext = <TTheme extends Theme>() =>
    useContext<HookInterface<TTheme>>(
        RootContext as unknown as Context<HookInterface<TTheme>>
    );
