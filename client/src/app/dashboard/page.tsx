import { Metadata } from 'next';

import Dashboard from '@/components/dashboard/Dashboard';

import getUser from '@/action/user-get';
import getCourses from '@/action/courses-get';
import getUserCourseProgress from '@/action/user-course-progress-get';
import getSubscriptions from '@/action/subscriptions-get';
import getCategories from '@/action/categories-get';

export const metadata: Metadata = {
  title: 'Bioreino | Dashboard',
  description:
    'Área do aluno para poder desfrutar dos cursos disponíveis para seu plano contratado',
};

export default async function DashboardPage() {
  const { data: user } = await getUser();

  const { data: subscriptions } = await getSubscriptions();
  const { data: courses } = await getCourses({ planId: user?.plan._id });
  const { data: courseProgress } = await getUserCourseProgress();
  const { data: categories } = await getCategories({ planId: user?.plan._id });

  return (
    <Dashboard
      courses={courses || []}
      courseProgress={courseProgress || []}
      subscriptions={subscriptions || []}
      categories={categories || []}
    />
  );
}
