'use client';

import { ReactNode } from 'react';
import styles from './fieldSplit.module.css';

export default function FieldSplit({ children }: { children: ReactNode }) {
  return <div className={styles.split}>{children}</div>;
}
