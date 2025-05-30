'use client';

import styles from './courseItem.module.css';
import classNames from 'classnames';

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
        <div
          className={classNames(styles.background)}
          style={{ backgroundImage: `url(${course.imageUrl})` }}
        ></div>
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
