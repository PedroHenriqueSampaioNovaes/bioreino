'use client';

import styles from './bioreinoLogoLink.module.css';
import Link from 'next/link';

import BioreinoLogo from '@/icons/BioreinoLogo';

interface BioreinoLogoLinkProps {
  classNameCustom?: string;
}

export default function BioreinoLogoLink({
  classNameCustom,
}: BioreinoLogoLinkProps) {
  return (
    <Link
      href="/"
      aria-label="Bioreino - Home"
      className={classNameCustom || styles.logo}
    >
      <BioreinoLogo />
    </Link>
  );
}
