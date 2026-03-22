'use client';

import styles from './courseCard.module.css';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { ICourse } from '@/common/@types/course';

interface ICourseCardProps {
  course: ICourse;
}

export default function CourseCard({ course }: ICourseCardProps) {
  return (
    <li className={classNames(styles.course)}>
      <Link href={`/curso/${course.slug}`}>
        <span className={classNames(styles.subscription)}>
          {course.plan.name}
        </span>
        <Image
          src={course.image}
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
      </Link>
    </li>
  );
}
