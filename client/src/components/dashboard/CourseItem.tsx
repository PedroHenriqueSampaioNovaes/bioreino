'use client';

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './courseItem.module.css';
import classNames from 'classnames';

import { ICourse } from '@/common/@types/course';
import { IUserCourseProgress } from '@/common/@types/user-course-progress';

interface ICourseItemProps {
  course: ICourse;
  courseProgress: IUserCourseProgress[];
  priorityByIndex: number;
}

function CourseItem({
  course,
  courseProgress,
  priorityByIndex,
}: ICourseItemProps) {
  const progress =
    courseProgress.find((progress) => progress.courseId === course._id)
      ?.progress || 0;

  return (
    <Link
      href={`/curso/${course.slug}`}
      prefetch={false}
      key={course._id}
      className={classNames(styles.card)}
    >
      <Image
        src={course.imageUrl}
        alt=""
        width={966}
        height={750}
        priority={priorityByIndex < 10}
        sizes="(max-width: 549px) 100vw, (max-width: 899px) 50vw, 25vw"
      />

      <div className={classNames(styles.details)}>
        <h2 className={classNames(styles.title)}>{course.title}</h2>
        <p
          className={classNames(styles.instructor)}
          aria-label={`Instrutor do curso: ${course.professor}`}
        >
          Prof: {course.professor}
        </p>
        <div className={classNames(styles.progress)}>
          <div
            className={styles.progressBar}
            role="progressbar"
            aria-valuemax={100}
            aria-valuemin={0}
            aria-valuenow={progress}
            aria-valuetext={`${progress}%`}
            aria-label="Progresso do curso"
          >
            <div
              id="progressBar"
              className={styles.progressBarCompleted}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className={classNames(styles.percentage)}>{progress}%</span>
        </div>
      </div>
    </Link>
  );
}

export default memo(CourseItem);
