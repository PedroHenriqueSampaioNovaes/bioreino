'use client';

import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import styles from './personalDataForm.module.css';
import { useHookFormMask } from 'use-mask-input';
import z from 'zod';
import { toast, ToastContentProps } from 'react-toastify';

import userTemporaryCreate from '@/action/user-temporary-create';
import login from '@/action/login';
import getUser from '@/action/user-get';

import { useUser } from '@/context/UserContext';

import { basePersonalDataSchema } from '@/schemas/personalData';

import Input from '../forms/Input';

type PersonalDataFormValues = z.infer<typeof basePersonalDataSchema>;

export default function PersonalDataForm() {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<PersonalDataFormValues>();
  const registerWithMask = useHookFormMask(register);

  const { setUser } = useUser();

  const router = useRouter();

  async function autoCreateAccount() {
    const { data, error, ok } = await userTemporaryCreate();

    if (!ok) {
      toast.error(error, { position: 'top-center' });
      return;
    }

    const dateNow = Date.now();
    const futureDate = new Date(data.accountExpiresAfter).getTime();
    const timeToExpireAccount = Math.ceil(
      (futureDate - dateNow) / (24 * 60 * 60 * 1000)
    );

    toast.success(CreateAccountMsgSuccess, {
      position: 'top-center',
      data: {
        timeToExpireAccount,
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

      <Input
        label="Nome completo *"
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="Email *"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="CPF *"
        {...registerWithMask('cpf', 'cpf', {
          jitMasking: true,
        })}
        error={errors.cpf?.message}
      />
      <Input
        label="Senha *"
        type="password"
        {...register('password', {
          onBlur: () => {
            const confirmPasswordValue = getValues('confirm_password');
            if (!confirmPasswordValue) return;

            trigger('confirm_password');
          },
        })}
        error={errors.password?.message}
      />
      <Input
        label="Confirmar senha *"
        type="password"
        {...register('confirm_password')}
        error={errors.confirm_password?.message}
      />
    </>
  );
}

type CreateAccountMsgSuccessProps = {
  data: { timeToExpireAccount: number; email: string; password: string };
};

const CreateAccountMsgSuccess = ({
  data,
}: Partial<ToastContentProps> & CreateAccountMsgSuccessProps) => (
  <div className={styles.toastMsg}>
    Esta conta expirará em {data.timeToExpireAccount} dia
    {data.timeToExpireAccount > 1 ? 's' : ''}.
    <hr />
    <p>E-MAIL: {data.email}</p>
    <p>SENHA: {data.password}</p>
  </div>
);
