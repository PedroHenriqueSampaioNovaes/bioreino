'use client';

import styles from './courseItem.module.css';
import classNames from 'classnames';
import Image from 'next/image';

import { ICourse } from '@/common/@types/course';

interface ICourseItemProps {
  course: ICourse;
}

export default function CourseItem({ course }: ICourseItemProps) {
  return (
    <li className={classNames(styles.course)}>
      <a href="">
        <span className={classNames(styles.subscription)}>
          {course.plan.name}
        </span>
        <Image
          src={course.imageUrl}
          alt=""
          width={966}
          height={750}
          priority
          sizes="(max-width: 1023px) 100vw, 25vw"
        />
        <div className={classNames(styles.details)}>
          <h3 className={classNames(styles.courseName)}>{course.title}</h3>
          <span className={classNames(styles.teacher)}>
            Prof. {course.professor}
          </span>
        </div>
      </a>
    </li>
  );
}
