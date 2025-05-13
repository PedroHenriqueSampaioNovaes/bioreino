'use client';

import { ComponentProps } from 'react';
import styles from './button.module.css';

export default function Button({
  children,
  ...props
}: ComponentProps<'button'>) {
  return (
    <button type="submit" className={styles.submit} {...props}>
      {children}
    </button>
  );
}
