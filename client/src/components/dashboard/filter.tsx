'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import styles from './filter.module.css';

import { ICategory } from '@/common/@types/category';
import { ISubscription } from '@/common/@types/subscription';
import { IUser } from '@/common/@types/user';

import Arrow from '@/icons/Arrow';
import AdviceMessageWhat from '@/icons/AdviceMessageWhat';

import SelectCustom, {
  ISelectItem,
  ISelectItemBase,
} from '@/components/forms/SelectCustom';

import DialogImage from '../ui/AlertDialogImage';

interface IFilter {
  user: IUser | null;
  subscriptions: ISubscription[];
  categories: ICategory[];
  setFilterPlan: Dispatch<SetStateAction<string>>;
  setFilterCategory: Dispatch<SetStateAction<string>>;
}

export default function Filter({
  user,
  subscriptions,
  categories,
  setFilterPlan,
  setFilterCategory,
}: IFilter) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const fullAccessSubscription = subscriptions.find(
    (subscription) => subscription.fullaccess
  );

  const subscriptionOptions: ISelectItemBase[] = subscriptions.map(
    (subscription) => {
      const userNotHaveFullaccess = !user?.plan.fullaccess;
      const needAlertDialog = subscription.fullaccess && userNotHaveFullaccess;

      return {
        label: subscription.name,
        value: subscription._id,
        onAction: needAlertDialog ? () => setDialogOpen(true) : undefined,
      };
    }
  );

  const categoryOptions: ISelectItem[] = categories.map((category) => ({
    label: category.name,
    value: category.value,
  }));

  return (
    <>
      <p>Filtrar por:</p>
      <div className={styles.filter}>
        <SelectCustom.ControlledWithCallback
          items={subscriptionOptions}
          initialValue={user?.plan._id}
          setFilter={setFilterPlan}
          ariaLabel="Filtrar por plano de assinatura"
          className={styles.width}
        />
        <Arrow />
        <SelectCustom.DefaultBase
          items={categoryOptions}
          setFilter={setFilterCategory}
          ariaLabel="Filtrar por categoria"
          className={styles.width}
        />
      </div>

      <DialogImage
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        ImageElement={AdviceMessageWhat}
        dialogConfig={{
          title: 'Um momento, amigo! 🧐',
          descriptionElement: (
            <>
              Para ter acesso às aulas do plano{' '}
              <strong>{fullAccessSubscription?.name}</strong>, você precisa
              atualizar seu plano atual (<strong>{user?.plan.name}</strong>
              )!!
            </>
          ),
          callToActionDeny: 'Deixar pra depois',
          callToActionConfirm: 'Atualizar plano',
          href: '/assinar/upgrade',
        }}
      />
    </>
  );
}
