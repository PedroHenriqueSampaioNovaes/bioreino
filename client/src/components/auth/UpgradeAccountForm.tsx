'use client';

import { useParams, useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { toast } from 'react-toastify';

import createAccountFormStyles from './createAccountForm.module.css';

import {
  basePaymentMethodSchema,
  paymentMethodRefine,
  paymentMethodSchema,
} from '@/schemas/payments';
import { subscriptionSchema } from '@/schemas/subscription';

import { useSubscription } from '@/context/SubscriptionContext';

import Steps from '../shared/Steps';

import SubscriptionForm from './SubscriptionForm';
import MethodPaymentForm from './MethodPaymentForm';
import userUpdate from '@/action/user-update';
import { useUser } from '@/context/UserContext';

const formSchema = z
  .object({
    ...subscriptionSchema.shape,
    ...basePaymentMethodSchema.shape,
  })
  .superRefine(paymentMethodRefine);

type AccountFormValues = z.infer<typeof formSchema>;

export default function UpgradeAccountForm() {
  const params = useParams() as { subscription: string };
  const router = useRouter();

  const { setUser } = useUser();

  const { getSubscriptionByKeyValue } = useSubscription();

  const subscription = getSubscriptionByKeyValue('name', params.subscription);
  if (!subscription) {
    router.push('/dashboard');
    return;
  }

  const saveFormData: SubmitHandler<AccountFormValues> = async (dataForm) => {
    const { data, ok, error } = await userUpdate({
      ...dataForm,
      subscriptionId: dataForm.subscription,
    });
    if (!ok) {
      toast.error(error, { position: 'top-center' });
      return;
    }

    setUser((oldUserData) => ({ ...oldUserData!, ...data.updatedUser }));

    if (data.stripeURL) {
      window.location.href = data.stripeURL;
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <>
      <h1 className={createAccountFormStyles.title}>
        Atualize sua assinatura e adquira acesso às aulas de seu novo plano
      </h1>

      <Steps
        formSchema={formSchema}
        steps={[
          {
            label: 'Plano de assinatura',
            component: <SubscriptionForm subscriptions={[subscription]} />,
            fields: ['subscription'],
            schema: subscriptionSchema,
          },
          {
            label: 'Método de Pagamento',
            component: <MethodPaymentForm />,
            fields: [
              'payment_method',
              'cep',
              'state',
              'street',
              'home_number',
              'neighborhood',
              'card_number',
              'cardholder_name',
              'validate',
              'cvv',
              'installment',
            ],
            schema: paymentMethodSchema,
          },
        ]}
        initialFormData={{
          subscription: subscription._id,
          payment_method: '',
          state: '',
          cep: '',
          street: '',
          home_number: '',
          neighborhood: '',
          card_number: '',
          cardholder_name: '',
          validate: '',
          cvv: '',
          installment: '',
        }}
        labelAction="Finalizar Pagamento"
        saveFormData={saveFormData}
      />
    </>
  );
}
