'use client';

import styles from './menuLesson.module.css';
import Link from 'next/link';
import classNames from 'classnames';
import { useState } from 'react';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { useLesson } from '@/context/LessonContext';

import AdviceMessageWhat from '@/icons/AdviceMessageWhat';

import BioreinoLogoLink from '../layout/BioreinoLogoLink';
import MenuLessonItem from './MenuLessonItem';
import AlertDialogImage from '../ui/AlertDialogImage';

interface MenuLessonProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (isOpen: boolean) => void;
}

export default function MenuLesson({
  menuIsOpen,
  setMenuIsOpen,
}: MenuLessonProps) {
  const { lessons } = useLesson();

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <nav className={classNames(styles.nav, { [styles.open]: menuIsOpen })}>
      <div className={styles.navMenuButton}>
        <button
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          aria-label={menuIsOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <IoChevronForward color="#fff" />
        </button>
      </div>

      <Link href="/dashboard" className={styles.navHeader}>
        <IoChevronBack /> <span>Dashboard</span>
      </Link>
      <ul className={styles.list}>
        {lessons?.map((lesson) => (
          <MenuLessonItem
            key={lesson._id}
            lessonItem={lesson}
            setDialogOpen={setDialogOpen}
          />
        ))}
      </ul>
      <AlertDialogImage
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        ImageElement={AdviceMessageWhat}
        dialogConfig={{
          title: 'Um momento, amigo! 🧐',
          descriptionElement: (
            <>
              Para ter acesso a esta aula, você precisa ser assinante de nossa
              plataforma. Confira nossos planos disponíveis!
            </>
          ),
          callToActionDeny: 'Deixar pra depois',
          callToActionConfirm: 'Matricular-se',
          href: `/assinar`,
        }}
      />

      <BioreinoLogoLink classNameCustom={styles.logo} />
    </nav>
  );
}
