'use client';

import classNames from 'classnames';
import styles from './inputPasswordHidden.module.css';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

import { useState } from 'react';

import Input, { InputProps } from './Input';

interface InputHiddenPasswordProps extends Omit<InputProps, 'type'> {
  error?: string;
}

export default function InputHiddenPassword({
  label,
  ...props
}: InputHiddenPasswordProps) {
  const [isVisible, setIsVisible] = useState(false);

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  return (
    <div className={classNames(styles.group)}>
      <Input label={label} type={isVisible ? 'text' : 'password'} {...props} />
      <button
        className={classNames(styles.icon)}
        type="button"
        onClick={toggleVisibility}
      >
        {isVisible ? (
          <IoEyeOutline size={'1.25em'} />
        ) : (
          <IoEyeOffOutline size={'1.25em'} />
        )}
      </button>
    </div>
  );
}
