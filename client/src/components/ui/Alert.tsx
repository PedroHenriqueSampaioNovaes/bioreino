'use client';

import classNames from 'classnames';
import styles from './alert.module.css';

interface AlertProps {
  title?: string;
  message: string;
  width?: 'full' | string;
  className?: string;
}

export default function Alert({
  title = 'ATENÇÃO',
  message,
  width = 'full',
  className,
}: AlertProps) {
  const widthClass = width === 'full' ? styles.fullWidth : '';
  const widthStyle = width !== 'full' ? { maxWidth: width } : undefined;

  return (
    <div
      className={classNames(styles.alert, widthClass, className)}
      style={widthStyle}
    >
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
