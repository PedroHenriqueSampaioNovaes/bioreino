'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import styles from './filter.module.css';
import Link from 'next/link';

import { ICategory } from '@/common/@types/category';
import { ISubscription } from '@/common/@types/subscription';
import { IUser } from '@/common/@types/user';

import Arrow from '@/icons/Arrow';
import AdviceMessageWhat from '@/icons/AdviceMessageWhat';

import Select, {
  ISelectItems,
  ISelectItemsControlled,
} from '@/components/forms/Select';

import {
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogRootUi,
  AlertDialogTitle,
} from '../ui/AlertDialog';

interface IFilter {
  user: IUser | null;
  subscriptions: ISubscription[];
  categories: ICategory[];
  filterPlan: string;
  setFilterPlan: Dispatch<SetStateAction<string>>;
  setFilterCategory: Dispatch<SetStateAction<string>>;
}

export default function Filter({
  user,
  subscriptions,
  categories,
  filterPlan,
  setFilterPlan,
  setFilterCategory,
}: IFilter) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const fullAccessSubscription = subscriptions.find(
    (subscription) => subscription.fullaccess,
  );

  const subscriptionOptions = subscriptions.map(
    (subscription): ISelectItemsControlled => {
      const userNotHaveFullaccess = !user?.plan.fullaccess;
      const needAlertDialog = subscription.fullaccess && userNotHaveFullaccess;

      return {
        label: subscription.name,
        value: subscription._id,
        onSelectOptionDisabled: needAlertDialog
          ? () => setDialogOpen(true)
          : undefined,
      };
    },
  );

  const categoryOptions: ISelectItems[] = categories.map((category) => ({
    label: category.name,
    value: category.value,
  }));

  return (
    <>
      <p>Filtrar por:</p>

      <div className={styles.filter}>
        <Select.Controlled
          items={subscriptionOptions}
          valueData={filterPlan || user?.plan._id}
          onValueChange={(value) => value !== null && setFilterPlan(value)}
          ariaLabel="Filtrar por plano de assinatura"
        />
        <Arrow />
        <Select.Uncontrolled
          items={categoryOptions}
          defaultValue={categoryOptions[0]?.value}
          onValueChange={(value) => value !== null && setFilterCategory(value)}
          ariaLabel="Filtrar por categoria"
        />
      </div>

      <AlertDialogRootUi open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogPortal>
          <AlertDialogPopup>
            <AdviceMessageWhat />
            <AlertDialogTitle>Um momento, amigo! 🧐</AlertDialogTitle>
            <AlertDialogDescription>
              Para ter acesso às aulas do plano{' '}
              <strong>{fullAccessSubscription?.name}</strong>, você precisa
              atualizar seu plano atual (<strong>{user?.plan.name}</strong>
              )!!
            </AlertDialogDescription>
            <AlertDialogClose
              nativeButton={false}
              render={
                <Link href={`/assinar/${fullAccessSubscription?.name}`} />
              }
            >
              Atualizar plano
            </AlertDialogClose>
            <AlertDialogClose buttonStyle="deny">
              Deixar pra depois
            </AlertDialogClose>
          </AlertDialogPopup>
        </AlertDialogPortal>
      </AlertDialogRootUi>
    </>
  );
}
