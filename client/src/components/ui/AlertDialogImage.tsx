'use client';

import { ComponentType, Dispatch, JSX, SetStateAction } from 'react';
import Link from 'next/link';
import styles from './alertDialog.module.css';
import classNames from 'classnames';

import { AlertDialog } from '@base-ui-components/react/alert-dialog';

interface IAlertDialogImageProps {
  dialogOpen?: boolean;
  setDialogOpen?: Dispatch<SetStateAction<boolean>>;
  ImageElement: ComponentType;
  dialogConfig: {
    title: string;
    descriptionElement: JSX.Element;
    callToActionDeny: string;
    callToActionConfirm: string;
    href: string;
  };
}

export default function AlertDialogImage({
  dialogOpen,
  setDialogOpen,
  ImageElement,
  dialogConfig,
}: IAlertDialogImageProps) {
  return (
    <AlertDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={styles.Backdrop} />
        <AlertDialog.Popup className={styles.Popup}>
          {<ImageElement />}

          <AlertDialog.Title className={styles.Title}>
            {dialogConfig.title}
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.Description}>
            {dialogConfig.descriptionElement}
          </AlertDialog.Description>
          <AlertDialog.Close
            nativeButton={false}
            data-color="red"
            className={classNames(styles.Button, styles.Confirm)}
            render={<Link href={dialogConfig.href} />}
          >
            {dialogConfig.callToActionConfirm}
          </AlertDialog.Close>
          <AlertDialog.Close className={classNames(styles.Button, styles.Deny)}>
            {dialogConfig.callToActionDeny}
          </AlertDialog.Close>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
