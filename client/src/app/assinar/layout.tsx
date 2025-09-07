import { ReactNode } from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { type IStateBrazil, StatesProvider } from '@/context/StatesContext';
import { SubscriptionProvider } from '@/context/SubscriptionContext';

import getSubscriptions from '@/action/subscriptions-get';

import CreateAccountFormHeader from '@/components/auth/CreateAccountFormHeader';

export const metadata: Metadata = {
  title: 'Bioreino | Assine',
  description:
    'Assine um de nossos planos para ter acesso aos cursos que oferecemos sobre biologia.',
};

export default async function Layout({ children }: { children: ReactNode }) {
  const response = await fetch('https://brasilapi.com.br/api/ibge/uf/v1', {
    cache: 'force-cache',
    next: {
      revalidate: 86400,
    },
  });
  const states = (await response.json()) as IStateBrazil[];

  const { data: subscriptions } = await getSubscriptions();
  if (!subscriptions) redirect('/');

  return (
    <StatesProvider states={states}>
      <SubscriptionProvider subscriptions={subscriptions}>
        <CreateAccountFormHeader />
        {children}
      </SubscriptionProvider>
    </StatesProvider>
  );
}
