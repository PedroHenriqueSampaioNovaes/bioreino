'use client';

import { useEffect, useState } from 'react';
import styles from './lesson.module.css';

import { useLesson } from '@/context/LessonContext';
import { useUser } from '@/context/UserContext';

import updateUserCourseProgress from '@/action/user-course-progress-update';

import MenuLesson from './MenuLesson';
import VideoContentArea from './VideoContentArea';
import Footer from './Footer';

export default function Lesson() {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  const { setUser } = useUser();

  const { course, currentLesson } = useLesson();

  useEffect(() => {
    async function makeLessonComplete() {
      if (!course?._id || !currentLesson?._id) return;

      const { data, ok } = await updateUserCourseProgress({
        courseId: course._id,
        lessonId: currentLesson._id,
      });

      if (ok) setUser(data);
    }
    makeLessonComplete();
  }, [course, currentLesson, setUser]);

  return (
    <div className={styles.wrapper}>
      <MenuLesson menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
      <div className={styles.container}>
        <VideoContentArea menuIsOpen={menuIsOpen} />
        <Footer menuIsOpen={menuIsOpen} />
      </div>
    </div>
  );
}
