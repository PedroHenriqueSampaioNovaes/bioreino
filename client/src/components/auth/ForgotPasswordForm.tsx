'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '../forms/Button';
import Input from '../forms/Input';
import forgotPassword from '@/action/forgot-password';
import { toast } from 'react-toastify';

const schema = z.object({
  email: z.string().nonempty('Preencha este campo').email('E-mail inválido'),
});

type Schema = z.infer<typeof schema>;

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Schema> = async ({ email }) => {
    const { data } = await forgotPassword({ email });

    toast.success(data, { position: 'top-center' });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />
      {isSubmitting ? (
        <Button disabled>Enviando...</Button>
      ) : (
        <Button>Enviar email</Button>
      )}
    </form>
  );
}
