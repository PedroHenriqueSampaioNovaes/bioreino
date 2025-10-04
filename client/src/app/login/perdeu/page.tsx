import { Metadata } from 'next';

import Header from '@/components/auth/Header';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Bioreino | Perdeu a Senha?',
  description: 'Troque a senha de sua conta bioreino.',
};

export default async function LostPasswordPage() {
  return (
    <div className="animeLeft">
      <Header title="Perdeu a Senha?" href='/login' linkTitle='Voltar para o login' />
      <ForgotPasswordForm />
    </div>
  );
}
