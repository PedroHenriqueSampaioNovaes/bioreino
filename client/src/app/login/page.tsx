import type { Metadata } from 'next';

import LoginForm from '@/components/auth/LoginForm';
import Header from '@/components/auth/Header';

export const metadata: Metadata = {
  title: 'Bioreino | Login',
  description:
    'Acesse sua conta para ter acesso aos cursos que oferecemos sobre biologia.',
};

export default function LoginPage() {
  return (
    <div className="animeLeft">
      <Header title="Login" />
      <LoginForm />
    </div>
  );
}
