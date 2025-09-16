'use client';

import { useParams } from 'next/navigation';
import styles from './createAccountForm.module.css';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import z from 'zod';

import Steps from '../shared/Steps';

import {
  basePaymentMethodSchema,
  paymentMethodRefine,
  paymentMethodSchema,
  personalDataSchema,
  subscriptionSchema,
} from '@/schemas/payments';
import {
  basePersonalDataSchema,
  personalDataRefine,
} from '@/schemas/personalData';

import { useSubscription } from '@/context/SubscriptionContext';

import userCreate from '@/action/user-create';

import PersonalDataForm from './PersonalDataForm';
import MethodPaymentForm from './MethodPaymentForm';
import SubscriptionForm from './SubscriptionForm';

const formSchema = z
  .object({
    ...basePersonalDataSchema.shape,
    ...subscriptionSchema.shape,
    ...basePaymentMethodSchema.shape,
  })
  .superRefine(personalDataRefine)
  .superRefine(paymentMethodRefine);

type AccountFormValues = z.infer<typeof formSchema>;

export default function CreateAccountForm() {
  const params = useParams() as { subscription: string };

  const { getSubscriptionByKeyValue, subscriptions } = useSubscription();

  const subscriptionId =
    getSubscriptionByKeyValue('name', params.subscription)?._id ||
    subscriptions[0]._id;

  const saveFormData: SubmitHandler<AccountFormValues> = async (dataForm) => {
    const { ok, data, error } = await userCreate({
      ...dataForm,
      subscriptionId: dataForm.subscription,
    });

    if (ok === false) {
      toast.error(error, { position: 'top-center' });
      return;
    }

    if (data?.checkoutURL) window.location.href = data.checkoutURL;
    else window.location.href = '/login';
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Assine e tenha acesso aos cursos do plano selecionado
      </h1>

      <Steps
        formSchema={formSchema}
        steps={[
          {
            label: 'Dados Pessoais',
            component: <PersonalDataForm />,
            fields: ['name', 'email', 'cpf', 'password', 'confirm_password'],
            schema: personalDataSchema,
          },
          {
            label: 'Plano de assinatura',
            component: <SubscriptionForm subscriptions={subscriptions} />,
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
          name: '',
          email: '',
          cpf: '',
          password: '',
          confirm_password: '',
          subscription: subscriptionId,
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
    </div>
  );
}
