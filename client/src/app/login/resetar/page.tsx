import { Metadata } from 'next';

import Header from '@/components/auth/Header';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
  title: 'Bioreino | Resete sua senha',
  description: 'Redefina a senha de sua conta Bioreino.',
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ key: string; email: string }>;
}) {
  const urlSearchParams = await searchParams;

  return (
    <div className="animeLeft">
      <Header title="Resete a Senha" href='/login' linkTitle='Voltar para o login' />
      <ResetPasswordForm searchParams={urlSearchParams} />
    </div>
  );
}
