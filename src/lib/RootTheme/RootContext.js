import {useContext, createContext} from 'react';

export const RootContext = createContext();

export const useRootContext = () => useContext(RootContext);
