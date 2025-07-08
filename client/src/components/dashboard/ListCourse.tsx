'use client';

import styles from './listCourse.module.css';
import classNames from 'classnames';

import { ICourse } from '@/common/@types/course';
import { IUserCourseProgress } from '@/common/@types/user-course-progress';

import CourseItem from './CourseItem';

interface IListCourseProps {
  courses: ICourse[];
  courseProgress: IUserCourseProgress[];
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
