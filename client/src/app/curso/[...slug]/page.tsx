import { redirect } from 'next/navigation';

import { ILesson } from '@/common/@types/lesson';

import getCourse from '@/action/course-get';
import getUserCourseProgress from '@/action/user-course-progress-get';

import Lesson from '@/components/lesson/Lesson';
import { LessonContextProvider } from '@/context/LessonContext';

interface IPageParams {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: IPageParams) {
  const {
    slug: [slugCourseParam],
  } = await params;
  const { data: course } = await getCourse({ slug: slugCourseParam });

  return {
    title: `Bioreino | ${course?.title}`,
    description: `Assista a diversas aulas disponíveis para o curso ${course?.title}`,
  };
}

interface ICoursePageProps {
  params: Promise<{ slug: string[] }>;
}

function getCurrentLesson(lessons: ILesson[], urlSlugLesson: string) {
  return lessons.find((lesson) => lesson.slug === urlSlugLesson) || null;
}

export default async function CoursePage({ params }: ICoursePageProps) {
  const {
    slug: [slugCourseParam, slugLessonParam],
  } = await params;

  const { data: course } = await getCourse({ slug: slugCourseParam });
  const { data: courseProgress } = await getUserCourseProgress();

  if (!course) redirect('/dashboard');

  const lessons = course.lessons as ILesson[];
  const currentLesson =
    getCurrentLesson(lessons, slugLessonParam) || lessons[0];

  if (!slugLessonParam) {
    redirect(`/curso/${slugCourseParam}/${lessons[0].slug}`);
  }

  return (
    <LessonContextProvider
      courseData={course}
      courseProgressData={courseProgress}
      lessonsData={lessons}
      currentLessonData={currentLesson}
    >
      <Lesson />
    </LessonContextProvider>
  );
}
