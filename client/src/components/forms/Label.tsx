'use client';

import styles from './label.module.css';

interface ILabelProps {
  children: React.ReactNode;
  label: string;
  htmlFor: string;
}

export default function Label({ children, htmlFor, label }: ILabelProps) {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={htmlFor} className={styles.label}>
        {label}
      </label>
      {children}
    </div>
  );
}
