import { Metadata } from 'next';
import Home from '@/components/home/Home';

export const metadata: Metadata = {
  title: 'Bioreino | Home',
  description: 'Página inicial da bioreino para apresentar a plataforma',
};

export default async function HomePage() {
  return <Home />;
}
