'use client';

import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import z from 'zod';

import Input from '../forms/Input';
import { basePersonalDataSchema } from '@/schemas/personalData';

type PersonalDataFormValues = z.infer<typeof basePersonalDataSchema>;

export default function PersonalDataForm() {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
  } = useFormContext<PersonalDataFormValues>();
  const registerWithMask = useHookFormMask(register);

  return (
    <>
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
