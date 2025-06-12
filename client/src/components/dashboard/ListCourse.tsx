'use client';

import styles from './listCourse.module.css';
import classNames from 'classnames';

import { ICourse, IProgress } from '@/common/@types/course';

import CourseItem from './CourseItem';

interface IListCourseProps {
  courses: ICourse[];
  courseProgress: IProgress[];
}

export default function ListCourse({
  courses,
  courseProgress,
}: IListCourseProps) {
  return (
    <div className={classNames(styles.containerCourses)}>
      {courses.map((course, i) => (
        <CourseItem
          key={course._id}
          course={course}
          courseProgress={courseProgress}
          priorityByIndex={i}
        />
      ))}
    </div>
  );
}
