'use client';

import styles from './methodPaymentForm.module.css';
import { useFormContext, useWatch } from 'react-hook-form';

import formatCurrency from '@/common/utils/formatCurrency';

import { useStates } from '@/context/StatesContext';

import type { CreateAccountFormValues } from '@/schemas/createAccountSchema';

import { useSubscription } from '@/context/SubscriptionContext';

import AddressForm from './AddressForm';
import CreditCardForm from './CreditCardForm';

export default function MethodPaymentForm() {
  const { states } = useStates();
  const { getSubscriptionByKeyValue } = useSubscription();

  const { register, control } = useFormContext<CreateAccountFormValues>();

  const watchPaymentMethod = useWatch({ control, name: 'payment_method' });
  const watchSubscription = useWatch({ control, name: 'subscription' });

  const paymentMethod = watchPaymentMethod;

  const needsAddress =
    paymentMethod === 'bank_slip' || paymentMethod === 'credit_card';

  const subscription = getSubscriptionByKeyValue('_id', watchSubscription);

  if (!subscription) return null;
  return (
    <div className={styles.wrapper}>
      <div className={styles.methodsPayment}>
        {/* PIX */}
        <div className={styles.divisorPayRadio}>
          <input
            type="radio"
            id="pix"
            value="pix"
            {...register('payment_method')}
          />
          <label className={styles.label} htmlFor="pix">
            <strong>Pix (5% de desconto)</strong>
            {
              <span>
                <span className={styles.discount}>
                  {formatCurrency(subscription.price)}
                </span>
                {formatCurrency(subscription.price * 0.95)}
              </span>
            }
          </label>
          <div className={styles.instructions}>
            <p className={styles.instructionsText}>
              Desconto de 5% aplicado. Ao clicar em FINALIZAR COMPRA você verá o
              código Copia/Cola e o QR Code.
            </p>
          </div>
        </div>

        {/* Credit Card */}
        <div className={styles.divisorPayRadio}>
          <input
            type="radio"
            id="credit_card"
            value="credit_card"
            {...register('payment_method')}
          />
          <label className={styles.label} htmlFor="credit_card">
            <strong>Cartão de Crédito</strong>
            {<span>até 12x de {formatCurrency(subscription.price / 12)}</span>}
          </label>
          <div className={styles.instructions}>
            {watchPaymentMethod === 'credit_card' && (
              <CreditCardForm price={subscription.price} />
            )}
          </div>
        </div>

        {/* Bank Slip */}
        <div className={styles.divisorPayRadio}>
          <input
            type="radio"
            id="bank_slip"
            value="bank_slip"
            {...register('payment_method')}
          />
          <label className={styles.label} htmlFor="bank_slip">
            <strong>Boleto Bancário</strong>
          </label>
          <div className={styles.instructions}>
            <p className={styles.instructionsText}>
              Ao clicar em FINALIZAR COMPRA você terá acesso ao boleto.
            </p>
          </div>
        </div>

        {/* Stripe */}
        <div className={styles.divisorPayRadio}>
          <input
            type="radio"
            id="stripe"
            value="stripe"
            {...register('payment_method')}
          />
          <label className={styles.label} htmlFor="stripe">
            <strong>Stripe</strong>
          </label>
          <div className={styles.instructions}>
            <p className={styles.instructionsText}>
              Ao clicar em &quot;Finalizar Compra&quot; a página será
              redirecionada e você poderá pagar à vista pelo Stripe. Esta opção
              possui diversos outros meios de pagamento.
            </p>
          </div>
        </div>
      </div>

      {needsAddress && <AddressForm states={states} />}
    </div>
  );
}
