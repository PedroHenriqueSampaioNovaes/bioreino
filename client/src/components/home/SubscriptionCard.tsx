'use client';

import Link from 'next/link';
import classNames from 'classnames';
import { IoCheckmarkCircle } from 'react-icons/io5';

import styles from './subscriptionCard.module.css';
import stylesButton from '@/components/forms/button.module.css';

import { ISubscription } from '@/common/@types/subscription';

import formatCurrency from '@/common/utils/formatCurrency';

type SubscriptionCardProps = Pick<ISubscription, 'benefits' | 'name' | 'price'>;

export default function SubscriptionCard({
  benefits,
  name,
  price,
}: SubscriptionCardProps) {
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
