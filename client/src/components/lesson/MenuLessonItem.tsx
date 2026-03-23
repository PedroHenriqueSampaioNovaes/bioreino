'use client';

import { Dispatch, memo, SetStateAction } from 'react';
import styles from './menuLessonItem.module.css';
import Link from 'next/link';
import classNames from 'classnames';

import { ILesson } from '@/common/@types/lesson';

import ClapperboardOpen from '@/icons/ClapperboardOpen';
import ClapperboardClosed from '@/icons/ClapperboardClosed';

import { useLesson } from '@/context/LessonContext';
import { useUser } from '@/context/UserContext';

interface MenuLessonItemProps {
  lessonItem: ILesson;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function MenuLessonItem({ lessonItem, setDialogOpen }: MenuLessonItemProps) {
  const { currentLesson, course, courseProgress } = useLesson();
  const { user } = useUser();

  const isCurrentLesson = lessonItem.slug === currentLesson?.slug;

  const currentCourseProgress = courseProgress?.find(
    (progress) => progress.courseId === course?._id,
  );

  const isLessonCompleted = currentCourseProgress?.lessons.find(
    (lesson) => lesson.lessonId === lessonItem._id,
  );

  function emitAlertToCreateAccount() {
    setDialogOpen(true);
  }

  return (
    <li className={styles.wrapper}>
      {lessonItem.free || user ? (
        <Link
          href={`/curso/${course?.slug}/${lessonItem.slug}`}
          className={classNames(styles.lesson, {
            [styles.active]: isCurrentLesson,
          })}
        >
          {isLessonCompleted ? <ClapperboardClosed /> : <ClapperboardOpen />}
          <h3 className={styles.title}>{lessonItem.title}</h3>
          <p className={styles.description} title={lessonItem.description}>
            {lessonItem.description}
          </p>
          {lessonItem.free ? <p>Grátis</p> : <p>Pago</p>}
        </Link>
      ) : (
        <div
          className={classNames(styles.lesson, {
            [styles.active]: isCurrentLesson,
          })}
          onClick={emitAlertToCreateAccount}
        >
          {isLessonCompleted ? <ClapperboardClosed /> : <ClapperboardOpen />}
          <h3 className={styles.title}>{lessonItem.title}</h3>
          <p className={styles.description} title={lessonItem.description}>
            {lessonItem.description}
          </p>
          {lessonItem.free ? <p>Grátis</p> : <p>Pago</p>}
        </div>
      )}
    </li>
  );
}

export default memo(MenuLessonItem);
