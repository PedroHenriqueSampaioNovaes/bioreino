'use client';

import { createContext, useContext } from 'react';

export interface IStateBrazil {
  id: number;
  sigla: string;
  nome: string;
}

interface IStatesContext {
  states: IStateBrazil[];
}

const StatesContext = createContext({} as IStatesContext);

export function useStates() {
  const context = useContext(StatesContext);

  if (!context) {
    throw new Error('useStates must be used within a StatesProvider');
  }
  const { states } = context;

  return { states };
}

interface IStatesProviderProps {
  children: React.ReactNode;
  states: IStateBrazil[];
}

export function StatesProvider({ children, states }: IStatesProviderProps) {
  return <StatesContext value={{ states }}>{children}</StatesContext>;
}
