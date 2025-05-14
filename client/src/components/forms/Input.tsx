'use client';

import styles from './input.module.css';
import classNames from 'classnames';
import { ComponentProps, forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

export interface InputProps extends Omit<ComponentProps<'input'>, 'required'> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, name, ...props }, ref) => {
    return (
      <div className={classNames(styles.wrapper)}>
        <label htmlFor={name} className={classNames(styles.label)}>
          {label}
        </label>
        <input
          ref={ref}
          className={classNames(styles.input, { [styles.error]: error })}
          type={type}
          id={name}
          name={name}
          {...props}
          aria-invalid={error ? 'true' : 'false'}
        />
        {error && (
          <ErrorMessage customClassName={styles.errorMessage}>
            {error}
          </ErrorMessage>
        )}
      </div>
    );
  }
);

export default Input;
Input.displayName = 'Input';
