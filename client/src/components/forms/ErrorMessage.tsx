'use client';

import { ReactNode } from 'react';
import styles from './errorMessage.module.css';
import classNames from 'classnames';

interface ErrorMessageProps {
  customClassName?: string;
  children: ReactNode;
}

export default function ErrorMessage({
  children,
  customClassName,
}: ErrorMessageProps) {
  return (
    <p
      className={classNames(
        'errorMessage',
        { [styles.error]: !customClassName },
        customClassName
      )}
      role="alert"
    >
      {children}
    </p>
  );
}
