'use client';

import { ReactNode } from 'react';
import styles from './alertDialog.module.css';
import classNames from 'classnames';

import { AlertDialog, AlertDialogRoot } from '@base-ui/react/alert-dialog';
import {
  DialogCloseProps,
  DialogDescriptionProps,
  DialogTitleProps,
  DialogTriggerProps,
} from '@base-ui/react';

export function AlertDialogRootUi<Payload>(
  props: AlertDialogRoot.Props<Payload>,
) {
  return (
    <AlertDialog.Root {...props}>
      {props.children}
    </AlertDialog.Root>
  );
}

export function AlertDialogTriggerUi<Payload>(
  props: DialogTriggerProps<Payload> & React.RefAttributes<HTMLElement>,
) {
  return <AlertDialog.Trigger {...props}>{props.children}</AlertDialog.Trigger>;
}

export function AlertDialogPortal({ children }: { children: ReactNode }) {
  return (
    <AlertDialog.Portal>
      <AlertDialog.Backdrop className={styles.Backdrop} />
      {children}
    </AlertDialog.Portal>
  );
}

export function AlertDialogPopup({ children }: { children: ReactNode }) {
  return (
    <AlertDialog.Popup className={styles.Popup}>{children}</AlertDialog.Popup>
  );
}

export function AlertDialogTitle(props: DialogTitleProps) {
  return (
    <AlertDialog.Title className={styles.Title} {...props}>
      {props.children}
    </AlertDialog.Title>
  );
}

export function AlertDialogDescription(props: DialogDescriptionProps) {
  return (
    <AlertDialog.Description className={styles.Description} {...props}>
      {props.children}
    </AlertDialog.Description>
  );
}

export function AlertDialogClose({
  children,
  buttonStyle = 'confirm',
  className,
  ...props
}: DialogCloseProps & {
  buttonStyle?: 'confirm' | 'deny';
}) {
  const buttonStyleClass =
    buttonStyle === 'confirm' ? styles.Confirm : styles.Deny;

  return (
    <AlertDialog.Close
      className={classNames(styles.Button, buttonStyleClass, className)}
      {...props}
    >
      {children}
    </AlertDialog.Close>
  );
}
