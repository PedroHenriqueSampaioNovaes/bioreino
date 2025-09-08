'use client';

import styles from './courseShowcase.module.css';
import classNames from 'classnames';

import { ICourse } from '@/common/@types/course';

import CourseCard from './CourseCard';

interface ICourseShowcaseProps {
  courses: ICourse[];
}

export default function CourseShowcase({ courses }: ICourseShowcaseProps) {
  return (
    <ul className={classNames(styles.listCourse)}>
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </ul>
  );
}
