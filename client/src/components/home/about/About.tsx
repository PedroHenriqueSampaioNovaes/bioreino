'use client';

import Image from 'next/image';
import classNames from 'classnames';

import styles from './about.module.css';

interface IAboutProps {
  image: string;
  alt: string;
  title: string;
  description: string;
  invert?: boolean;
}

export default function About({
  image,
  alt,
  title,
  description,
  invert,
}: IAboutProps) {
  return (
    <div className={classNames(styles.container)}>
      <Image
        src={image}
        width={700}
        height={551}
        priority
        alt={alt}
        className={classNames(styles.img, {
          [styles.orderReverse]: invert,
        })}
      />
      <div className={classNames(styles.description)}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
