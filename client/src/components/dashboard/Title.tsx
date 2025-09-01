'use client';

import { ComponentProps, ReactNode } from 'react';
import styles from './title.module.css';

interface ITitle extends ComponentProps<'h4'> {
  children: ReactNode;
}

export default function Title({ children, ...props }: ITitle) {
  return (
    <h4 className={styles.title} tabIndex={0} {...props}>
      {children}
    </h4>
  );
}
