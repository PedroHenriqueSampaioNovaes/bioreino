'use client';

import styles from './header.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { IoChevronBack } from 'react-icons/io5';

import useMedia from '@/hooks/useMedia';

interface HeaderProps {
  title: string;
  href?: string;
  linkTitle?: string;
}

export default function Header({ title, href = '/', linkTitle }: HeaderProps) {
  const isDesktop = useMedia('(min-width: 768px)');

  return (
    <div className={classNames(styles.container)}>
      <Link
        href={href}
        className={classNames(styles.back)}
        title={linkTitle || "Voltar para a página inicial"}
      >
        <IoChevronBack size={isDesktop ? '1.875rem' : '1.5rem'} />
      </Link>

      <h1 className={classNames(styles.title)}>{title}</h1>
    </div>
  );
}
