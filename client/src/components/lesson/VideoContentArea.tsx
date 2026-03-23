'use client';

import styles from './videoContentArea.module.css';
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
  const { videoLessonInfo } = useLesson();

  const isMobile = useMedia('(max-width: 768px)');

  return (
    <main
      className={classNames(styles.videoContentArea, {
        [styles.menuOpened]: menuIsOpen && !isMobile,
      })}
    >
      <div className={styles.videoContainer}>
        {videoLessonInfo?.video ? (
          <iframe
            src={videoLessonInfo?.video}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}
          >
            Ocorreu um erro e não foi possível carregar o vídeo. Verifique se
            está logado e se possui uma assinatura ativa.
          </p>
        )}
      </div>

      <Transcription />
    </main>
  );
}
