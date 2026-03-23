import { redirect } from 'next/navigation';

import getCourse from '@/action/course-get';
import getUserCourseProgress from '@/action/user-course-progress-get';
import getLessons from '@/action/lessons-get';
import getLesson from '@/action/lesson-get';
import getVideoLessonInfo from '@/action/video-lesson-info-get';

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

export default async function CoursePage({ params }: ICoursePageProps) {
  const {
    slug: [slugCourseParam, slugLessonParam],
  } = await params;

  const { data: course } = await getCourse({ slug: slugCourseParam });
  const [{ data: courseProgress }, { data: lessons }] = await Promise.all([
    getUserCourseProgress(),
    getLessons({ course_id: course?._id }),
  ]);

  if (!course || !lessons?.length) redirect('/dashboard');

  let currentLesson = lessons[0];

  if (!slugLessonParam) {
    redirect(`/curso/${slugCourseParam}/${currentLesson?.slug}`);
  }

  const { data: lesson } = await getLesson({ slug: slugLessonParam });
  if (lesson) currentLesson = lesson;

  const { data: videoLessonInfo } = await getVideoLessonInfo({
    lessonId: currentLesson?._id,
  });

  return (
    <LessonContextProvider
      courseData={course}
      courseProgressData={courseProgress}
      lessonsData={lessons}
      currentLessonData={currentLesson}
      videoLessonInfo={videoLessonInfo}
    >
      <Lesson />
    </LessonContextProvider>
  );
}
