'use client';

import classNames from 'classnames';

import styles from './subscriptions.module.css';

import { ISubscription } from '@/common/@types/subscription';

import SubscriptionCard from './SubscriptionCard';

interface ISubscriptionsProps {
  subscriptions: ISubscription[];
}

export default function Subscriptions({ subscriptions }: ISubscriptionsProps) {
  return (
    <div className={classNames(styles.listSubscription)}>
      {subscriptions.map(({ _id, benefits, name, price }) => (
        <SubscriptionCard
          key={_id}
          benefits={benefits}
          name={name}
          price={price}
        />
      ))}
    </div>
  );
}
