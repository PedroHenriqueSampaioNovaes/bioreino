'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './login.module.css';
import classNames from 'classnames';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import login from '@/action/login';

import Input from '@/components/forms/Input';
import InputPasswordHidden from '@/components/forms/InputPasswordHidden';
import Button from '@/components/forms/Button';
import ErrorMessage from '../forms/ErrorMessage';

const schema = z.object({
  email: z.string().nonempty('Preencha este campo').email('E-mail inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

type Schema = z.infer<typeof schema>;

export default function LoginForm() {
  const [error, setError] = useState<string>('');

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const signInWithEmailAndPassword: SubmitHandler<Schema> = async ({
    email,
    password,
  }) => {
    const { ok, error } = await login({ email, password });
    if (!ok) {
      setError(error);
      return;
    }

    window.location.href = '/dashboard';
  };

  return (
    <form
      onSubmit={handleSubmit(signInWithEmailAndPassword)}
      className={classNames(styles.form)}
    >
      <Input label="E-mail" name="email" control={control} />
      <InputPasswordHidden label="Senha" name="password" control={control} />

      <p className={classNames(styles.suggestions)}>
        Perdeu a Senha? <Link href={'/login/perdeu'}>Clique aqui</Link>
      </p>
      <p className={classNames(styles.suggestions)}>
        Não possui um plano assinado? <Link href={'/assinar'}>Assine aqui</Link>
      </p>

      {isSubmitting ? (
        <Button disabled={true}>Entrando...</Button>
      ) : (
        <Button>Entrar</Button>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </form>
  );
}
