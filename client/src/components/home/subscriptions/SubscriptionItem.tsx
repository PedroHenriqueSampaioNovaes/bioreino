'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { IoCheckmarkCircle } from 'react-icons/io5';

import styles from './subscriptionItem.module.css';
import stylesButton from '@/components/forms/button.module.css';

import { ISubscription } from '@/common/@types/subscription';

import formatCurrency from '@/common/utils/formatCurrency';

type SubscriptionItemProps = Omit<ISubscription, '_id'>;

export default function SubscriptionItem({
  benefits,
  name,
  price,
}: SubscriptionItemProps) {
  return (
    <div className={classNames(styles.card)}>
      <h3 className={classNames(styles.title)}>{name}</h3>
      <ul>
        {benefits.map((benefit) => (
          <li key={benefit} className={classNames(styles.listItem)}>
            <IoCheckmarkCircle color="var(--color-secondary)" />
            <p>{benefit}</p>
          </li>
        ))}
      </ul>
      <p className={classNames(styles.price)}>{formatCurrency(price)}</p>
      <Link
        href={`/assinar/${name}`}
        className={classNames(stylesButton.submit, styles.button)}
      >
        Assine já!
      </Link>
    </div>
  );
}
