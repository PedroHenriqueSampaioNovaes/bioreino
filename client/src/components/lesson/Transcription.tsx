'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './transcription.module.css';
import classNames from 'classnames';

import { useLesson } from '@/context/LessonContext';

import { IoChevronDown } from 'react-icons/io5';

export default function Transcription() {
  const { currentLesson } = useLesson();

  const [isExpanded, setIsExpanded] = useState(false);

  const transcriptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    if (isExpanded && transcriptionRef.current) {
      if (observer === null) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                transcriptionRef.current!.scrollIntoView({
                  behavior: 'smooth',
                  block: 'end',
                });
              }

              if (observer) observer.unobserve(transcriptionRef.current!);
            });
          },
          {
            threshold: 1,
          }
        );

        observer.observe(transcriptionRef.current);
      }
    }

    return () => {
      observer?.disconnect();
    };
  }, [isExpanded]);

  return (
    <div ref={transcriptionRef} className={styles.transcriptionContainer}>
      <h2 className={styles.transcriptionTitle}>Transcrição</h2>
      {currentLesson?.transcription ? (
        <p
          className={classNames(styles.transcriptionText, {
            [styles.active]: isExpanded,
          })}
        >
          {currentLesson?.transcription}
        </p>
      ) : (
        <p className={styles.noTranscription}>
          Desculpe, por enquanto não há transcrição disponível para esta aula.
        </p>
      )}

      {currentLesson?.transcription && (
        <button
          className={classNames(styles.expandButton, {
            [styles.active]: isExpanded,
          })}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Recolher' : 'Expandir'} <IoChevronDown />
        </button>
      )}
    </div>
  );
}
