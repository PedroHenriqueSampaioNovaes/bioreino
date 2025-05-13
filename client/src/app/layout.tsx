import type { Metadata } from 'next';
import classNames from 'classnames';
import { catamaran, fredoka } from '../common/fonts';
import 'normalize.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bioreino',
  description:
    'Site de cursos de biologia para estudantes de ensino fundamental e médio, além de profissionais da área.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={classNames(fredoka.variable, catamaran.variable)}>
        {children}
      </body>
    </html>
  );
}
