'use client';

import Link from 'next/link';
import styles from './footer.module.css';
import classNames from 'classnames';

import { IoChevronForward } from 'react-icons/io5';

import { useLesson } from '@/context/LessonContext';

import useMedia from '@/hooks/useMedia';

interface FooterProps {
  menuIsOpen: boolean;
}

export default function Footer({ menuIsOpen }: FooterProps) {
  const { course, lessons, currentLesson } = useLesson();

  const isMobile = useMedia('(max-width: 768px)');

  const nextLessonIndex = lessons
    ? lessons.findIndex((lesson) => lesson._id === currentLesson?._id) + 1
    : null;
  const nextLesson = nextLessonIndex ? lessons?.[nextLessonIndex] : null;

  return (
    <footer
      className={classNames(styles.footer, {
        [styles.menuOpened]: menuIsOpen && !isMobile,
      })}
    >
      <div className={styles.container}>
        <div className={styles.details}>
          <h1>{course?.title}</h1>
          <p>Prof: {course?.professor}</p>
        </div>

        {nextLesson ? (
          <Link href={`/curso/${course?.slug}/${nextLesson?.slug}`}>
            Próxima aula <IoChevronForward />
          </Link>
        ) : (
          <Link href="/dashboard">
            Dashboard <IoChevronForward />
          </Link>
        )}
      </div>
    </footer>
  );
}
