'use client';

import { memo } from 'react';
import styles from './menuLessonItem.module.css';
import Link from 'next/link';
import classNames from 'classnames';

import { ILesson } from '@/common/@types/lesson';

import ClapperboardOpen from '@/icons/ClapperboardOpen';
import ClapperboardClosed from '@/icons/ClapperboardClosed';

import { useLesson } from '@/context/LessonContext';
import { useUser } from '@/context/UserContext';

import { AlertDialogTriggerUi } from '../ui/AlertDialog';
import { alertDialogMenuLessonHandle } from './MenuLesson';

interface MenuLessonItemProps {
  lessonItem: ILesson;
}

function MenuLessonItem({ lessonItem }: MenuLessonItemProps) {
  const { currentLesson, course, courseProgress } = useLesson();
  const { user } = useUser();

  const isCurrentLesson = lessonItem.slug === currentLesson?.slug;

  const currentCourseProgress = courseProgress?.find(
    (progress) => progress.courseId === course?._id,
  );

  const isLessonCompleted = currentCourseProgress?.lessons.find(
    (lesson) => lesson.lessonId === lessonItem._id,
  );

  return (
    <li className={styles.wrapper}>
      {lessonItem.free || user ? (
        <Link
          href={`/curso/${course?.slug}/${lessonItem.slug}`}
          className={classNames(styles.lesson, {
            [styles.active]: isCurrentLesson,
            [styles.free]: lessonItem.free && !user,
          })}
        >
          {isLessonCompleted ? <ClapperboardClosed /> : <ClapperboardOpen />}
          <h3 className={styles.title}>{lessonItem.title}</h3>
          <p className={styles.description} title={lessonItem.description}>
            {lessonItem.description}
          </p>
          {!user && lessonItem.free && <p className={styles.freeText}>G</p>}
        </Link>
      ) : (
        <AlertDialogTriggerUi
          handle={alertDialogMenuLessonHandle}
          className={classNames(styles.lesson, {
            [styles.active]: isCurrentLesson,
          })}
        >
          {isLessonCompleted ? <ClapperboardClosed /> : <ClapperboardOpen />}
          <h3 className={styles.title}>{lessonItem.title}</h3>
          <p className={styles.description} title={lessonItem.description}>
            {lessonItem.description}
          </p>
        </AlertDialogTriggerUi>
      )}
    </li>
  );
}

export default memo(MenuLessonItem);
