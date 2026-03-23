'use client';

import styles from './menuLesson.module.css';
import Link from 'next/link';
import classNames from 'classnames';

import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import { useLesson } from '@/context/LessonContext';
import { useUser } from '@/context/UserContext';

import AdviceMessageWhat from '@/icons/AdviceMessageWhat';

import BioreinoLogoLink from '../layout/BioreinoLogoLink';
import MenuLessonItem from './MenuLessonItem';
import {
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogRootUi,
  AlertDialogTitle,
} from '../ui/AlertDialog';
import { AlertDialog } from '@base-ui/react';

export const alertDialogMenuLessonHandle = AlertDialog.createHandle();

interface MenuLessonProps {
  menuIsOpen: boolean;
  setMenuIsOpen: (isOpen: boolean) => void;
}

export default function MenuLesson({
  menuIsOpen,
  setMenuIsOpen,
}: MenuLessonProps) {
  const { lessons } = useLesson();
  const { user } = useUser();

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

      <Link href={user ? '/dashboard' : '/'} className={styles.navHeader}>
        <IoChevronBack /> <span>{user ? 'Dashboard' : 'Home'}</span>
      </Link>
      <ul className={styles.list}>
        {lessons?.map((lesson) => (
          <MenuLessonItem key={lesson._id} lessonItem={lesson} />
        ))}
      </ul>

      <AlertDialogRootUi handle={alertDialogMenuLessonHandle}>
        <AlertDialogPortal>
          <AlertDialogPopup>
            <AdviceMessageWhat />
            <AlertDialogTitle>Um momento, amigo! 🧐</AlertDialogTitle>
            <AlertDialogDescription>
              Para ter acesso a esta aula, você precisa ser assinante de nossa
              plataforma. Confira nossos planos disponíveis!
            </AlertDialogDescription>
            <AlertDialogClose
              nativeButton={false}
              render={<Link href={`/assinar`} />}
            >
              Matricule-se
            </AlertDialogClose>
            <AlertDialogClose buttonStyle="deny">
              Deixar pra depois
            </AlertDialogClose>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialogRootUi>

      <BioreinoLogoLink classNameCustom={styles.logo} />
    </nav>
  );
}
