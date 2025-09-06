'use client';

import Link from 'next/link';
import styles from './createAccountFormHeader.module.css';
import classNames from 'classnames';

import BioreinoLogoLink from '../layout/BioreinoLogoLink';

export default function CreateAccountFormHeader() {
  return (
    <header className={classNames('container', styles.header)}>
      <BioreinoLogoLink />

      <Link href="/login" className={styles.login}>Entrar</Link>
    </header>
  );
}
