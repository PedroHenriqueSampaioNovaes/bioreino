import { Metadata } from 'next';

import getCourses from '@/action/courses-get';
import getSubscriptions from '@/action/subscriptions-get';

import Home from '@/components/home/Home';

export const metadata: Metadata = {
  title: 'Bioreino | Home',
  description:
    'Página inicial da bioreino para apresentar a plataforma e a vantagem de cada plano de assinatura.',
};

export default async function HomePage() {
  const { data: courses } = await getCourses({ hasLessonFree: true, limit: 3 });
  const { data: subscriptions } = await getSubscriptions();

  return <Home courses={courses || []} subscriptions={subscriptions || []} />;
}
