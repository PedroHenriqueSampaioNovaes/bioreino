'use client';

import { memo } from 'react';
import styles from './menuLessonItem.module.css';
import Link from 'next/link';
import classNames from 'classnames';

import { ILesson } from '@/common/@types/lesson';

import ClapperboardOpen from '@/icons/ClapperboardOpen';
import ClapperboardClosed from '@/icons/ClapperboardClosed';

import { useLesson } from '@/context/LessonContext';

interface MenuLessonItemProps {
  lessonItem: ILesson;
}

function MenuLessonItem({ lessonItem }: MenuLessonItemProps) {
  const { currentLesson, course, courseProgress, videoLessonInfo } = useLesson();

  const isCurrentLesson = lessonItem.slug === currentLesson?.slug;

  const currentCourseProgress = courseProgress?.find(
    (progress) => progress.courseId === course?._id,
  );

  const isLessonCompleted = currentCourseProgress?.lessons.find(
    (lesson) => lesson.lessonId === lessonItem._id,
  );

  return (
    <li className={styles.wrapper}>
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
    </li>
  );
}

export default memo(MenuLessonItem);
