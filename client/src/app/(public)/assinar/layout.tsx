import { ReactNode } from 'react';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import styles from './assinar.module.css';

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
  const [responseStates, responseSubscriptions] = await Promise.all([
    fetch('https://brasilapi.com.br/api/ibge/uf/v1', {
      cache: 'force-cache',
      next: {
        revalidate: 7 * 24 * 60 * 60,
      },
    }).then((response) => response.json() as Promise<IStateBrazil[]>),
    getSubscriptions(),
  ]);
  const { data: subscriptions } = responseSubscriptions;
  if (!subscriptions) redirect('/');

  return (
    <StatesProvider states={responseStates}>
      <SubscriptionProvider subscriptions={subscriptions}>
        <CreateAccountFormHeader />
        <div className={styles.container}>{children}</div>
      </SubscriptionProvider>
    </StatesProvider>
  );
}
