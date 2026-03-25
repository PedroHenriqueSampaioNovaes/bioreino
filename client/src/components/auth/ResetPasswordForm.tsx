'use client';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import * as z from 'zod';

import InputHiddenPassword from '../forms/InputPasswordHidden';
import Button from '../forms/Button';
import resetPassword from '@/action/reset-password';

const schema = z.object({
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

type Schema = z.infer<typeof schema>;

interface ResetPasswordFormProps {
  searchParams: {
    key: string;
    email: string;
  };
}

export default function ResetPasswordForm({
  searchParams,
}: ResetPasswordFormProps) {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const resetPasswordHandler: SubmitHandler<Schema> = async ({ password }) => {
    const { data, error, ok } = await resetPassword({
      key: searchParams.key,
      email: searchParams.email,
      password,
    });

    if (ok) {
      toast.success(data?.message, { position: 'top-center' });
      router.push('/login');
    } else {
      toast.error(error, { position: 'top-center' });
    }
  };

  return (
    <form onSubmit={handleSubmit(resetPasswordHandler)}>
      <InputHiddenPassword
        label="Nova senha"
        control={control}
        name="password"
      />
      {isSubmitting ? (
        <Button disabled>Redefinindo senha...</Button>
      ) : (
        <Button>Criar nova senha</Button>
      )}
    </form>
  );
}
