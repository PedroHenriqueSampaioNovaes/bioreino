'use client';

import styles from './bioreinoLogoLink.module.css';
import Link from 'next/link';

import BioreinoLogo from '@/icons/BioreinoLogo';

export default function BioreinoLogoLink() {
  return (
    <Link href="/" aria-label="Bioreino - Home" className={styles.logo}>
      <BioreinoLogo />
    </Link>
  );
}
