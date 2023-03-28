import {useContext, createContext} from 'react';

import type {HookInterface} from './HookInterfaceType';

export const RootContext = createContext<HookInterface | null>(null);

export const useRootContext = () => useContext<HookInterface>(RootContext);
