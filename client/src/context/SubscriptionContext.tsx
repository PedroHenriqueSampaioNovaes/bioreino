'use client';

import { createContext, ReactNode, useContext } from 'react';

import { ISubscription } from '@/common/@types/subscription';

interface ISubscriptionContext {
  subscriptions: ISubscription[];
}

const SubscriptionContext = createContext({} as ISubscriptionContext);

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error(
      'useSubscription must be used within a SubscriptionContextProvider'
    );
  }

  const { subscriptions } = context;

  function getSubscriptionByKeyValue(key: keyof ISubscription, value: string) {
    return subscriptions.find((subscription) => subscription[key] === value);
  }

  return {
    subscriptions,
    getSubscriptionByKeyValue,
  };
}

interface ISubscriptionProviderProps extends ISubscriptionContext {
  children: ReactNode;
}

export function SubscriptionProvider({
  children,
  subscriptions,
}: ISubscriptionProviderProps) {
  return (
    <SubscriptionContext value={{ subscriptions }}>
      {children}
    </SubscriptionContext>
  );
}
