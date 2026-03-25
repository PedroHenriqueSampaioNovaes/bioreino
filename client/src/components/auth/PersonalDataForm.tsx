'use client';

import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './personalDataForm.module.css';
import z from 'zod';
import { toast, ToastContentProps } from 'react-toastify';

import userTemporaryCreate from '@/action/user-temporary-create';
import login from '@/action/login';
import getUser from '@/action/user-get';

import { useUser } from '@/context/UserContext';

import { basePersonalDataSchema } from '@/schemas/personalData';

import Countdown from '@/common/utils/Countdown';

import Input from '../forms/Input';

type PersonalDataFormValues = z.infer<typeof basePersonalDataSchema>;

export default function PersonalDataForm() {
  const {
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<PersonalDataFormValues>();

  const { setUser } = useUser();

  const router = useRouter();

  async function autoCreateAccount() {
    const { data, error, ok } = await userTemporaryCreate();

    if (!ok) {
      toast.error(error, { position: 'top-center' });
      return;
    }
    if (!data) return;

    const futureDate = new Date(data.accountExpiresAfter);
    const timeToExpireAccount = new Countdown(futureDate).total;

    toast.success(CreateAccountMsgSuccess, {
      position: 'top-center',
      data: {
        dateToExpireAccount: {
          hours: timeToExpireAccount.hours,
          minutes: timeToExpireAccount.minutes,
        },
        email: data.email,
        password: data.password,
      },
      autoClose: 30000,
    });

    const { ok: successLogin } = await login({
      email: data.email,
      password: data.password,
    });

    if (successLogin) {
      const { data: userData, ok: successGetUserData } = await getUser();

      if (successGetUserData) {
        setUser(userData);
        router.push('/dashboard');
      }
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.callToAction}
        title="Esta função é designada para recrutadores, pois uma conta com dados aleatórios será criada automaticamente para que o mesmo economize tempo digitando cada um dos campos"
        onClick={autoCreateAccount}
      >
        Auto cadastramento para recrutadores
      </button>

      <Input label="Nome completo *" name="name" control={control} />
      <Input label="Email *" name="email" control={control} />
      <Input
        label="CPF *"
        name="cpf"
        control={control}
        mask="cpf"
        maskOptions={{ jitMasking: true }}
      />
      <Input
        label="Senha *"
        type="password"
        name="password"
        control={control}
        onChange={() => {
          const confirmPasswordValue = getValues('confirm_password');
          if (!confirmPasswordValue) return;

          trigger('confirm_password');
        }}
      />
      <Input
        label="Confirmar senha *"
        type="password"
        name="confirm_password"
        control={control}
      />
    </>
  );
}

type CreateAccountMsgSuccessProps = {
  data: {
    dateToExpireAccount: { hours: number; minutes: number };
    email: string;
    password: string;
  };
};

const CreateAccountMsgSuccess = ({
  data,
}: Partial<ToastContentProps> & CreateAccountMsgSuccessProps) => (
  <div className={styles.toastMsg}>
    Esta conta expirará em {data.dateToExpireAccount.hours} horas e{' '}
    {data.dateToExpireAccount.minutes} minutos.
    <hr />
    <p>E-MAIL: {data.email}</p>
    <p>SENHA: {data.password}</p>
  </div>
);
