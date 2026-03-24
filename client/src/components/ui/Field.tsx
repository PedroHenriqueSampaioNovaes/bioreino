'use client';

import {
  Field,
  FieldControlProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldItemProps,
  FieldLabelProps,
  FieldRootProps,
} from '@base-ui/react/field';
import styles from './field.module.css';

import classNames from 'classnames';

export function FieldRootUi(props: FieldRootProps) {
  return (
    <Field.Root {...props} className={styles.wrapper}>
      {props.children}
    </Field.Root>
  );
}

export function FieldLabel(props: FieldLabelProps) {
  return (
    <Field.Label
      {...props}
      className={classNames(styles.Label, props.className)}
    >
      {props.children}
    </Field.Label>
  );
}

export function FieldControl(props: FieldControlProps) {
  return <Field.Control {...props}>{props.children}</Field.Control>;
}

export function FieldDescription(props: FieldDescriptionProps) {
  return (
    <Field.Description
      {...props}
      className={classNames(styles.Description, props.className)}
    >
      {props.children}
    </Field.Description>
  );
}

export function FieldItem(props: FieldItemProps) {
  return <Field.Item {...props}>{props.children}</Field.Item>;
}

export function FieldError(props: FieldErrorProps) {
  return (
    <Field.Error
      {...props}
      className={classNames(styles.Error, props.className)}
    >
      {props.children}
    </Field.Error>
  );
}
