'use client';

import styles from './VideoContentArea.module.css';
import classNames from 'classnames';

import { useLesson } from '@/context/LessonContext';

import useMedia from '@/hooks/useMedia';

import Transcription from './Transcription';

interface VideoContentAreaProps {
  menuIsOpen: boolean;
}

export default function VideoContentArea({
  menuIsOpen,
}: VideoContentAreaProps) {
  const { currentLesson } = useLesson();

  const isMobile = useMedia('(max-width: 768px)');

  return (
    <main
      className={classNames(styles.videoContentArea, {
        [styles.menuOpened]: menuIsOpen && !isMobile,
      })}
    >
      <div className={styles.videoContainer}>
        <iframe
          src={currentLesson?.videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <Transcription />
    </main>
  );
}
