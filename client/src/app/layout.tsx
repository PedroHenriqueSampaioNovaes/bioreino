import type { Metadata } from 'next';
import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';

import { catamaran, fredoka } from '../common/fonts';
import 'normalize.css';
import './globals.css';

import { UserContextProvider } from '@/context/UserContext';

import getUser from '@/action/user-get';

export const metadata: Metadata = {
  title: 'Bioreino',
  description:
    'Site de cursos de biologia para estudantes de ensino fundamental e médio, além de profissionais da área.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await getUser();

  return (
    <html lang="pt-br">
      <body className={classNames(fredoka.variable, catamaran.variable)}>
        <UserContextProvider userData={user}>{children}</UserContextProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
