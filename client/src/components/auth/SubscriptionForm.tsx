'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import styles from './subscription.module.css';
import z from 'zod';

import { ISubscription } from '@/common/@types/subscription';

import {
  basePaymentMethodSchema,
  subscriptionSchema,
} from '@/schemas/payments';

import formatCurrency from '@/common/utils/formatCurrency';

import { useSubscription } from '@/context/SubscriptionContext';

import Select from '../forms/Select';

type SubscriptionFormValues = z.infer<
  typeof subscriptionSchema & typeof basePaymentMethodSchema
>;

interface ISubscriptionFormProps {
  subscriptions: ISubscription[];
}

export default function SubscriptionForm({
  subscriptions,
}: ISubscriptionFormProps) {
  const { getSubscriptionByKeyValue } = useSubscription();

  const { control, getValues, setValue } =
    useFormContext<SubscriptionFormValues>();

  const watchSubscription = useWatch({ control, name: 'subscription' });

  const listSubscriptionData = subscriptions.map((item) => {
    const label =
      item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase();

    return { label, value: item._id };
  });

  const subscriptionSelected =
    getSubscriptionByKeyValue('_id', watchSubscription) || subscriptions[0];

  useEffect(() => {
    if (!getValues('subscription'))
      setValue('subscription', subscriptionSelected.name);
  }, [getValues, setValue, subscriptionSelected]);

  useEffect(() => {
    setValue('installment', '');
  }, [setValue]);

  return (
    <>
      <Select.ControlledByRHF
        label="Selecione um plano *"
        ariaLabel="Selecione um plano de assinatura"
        id="subscription"
        items={listSubscriptionData}
        controller={{ name: 'subscription', control }}
      />

      <h2 className={styles.benefitsTitle}>Benefícios:</h2>
      <ul className={styles.benefitList}>
        {subscriptionSelected.benefits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className={styles.total}>
        <h3>Total da compra:</h3>
        <span>{formatCurrency(subscriptionSelected.price)}</span>
      </div>
    </>
  );
}
