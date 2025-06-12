'use client';

import { Dispatch, SetStateAction } from 'react';
import styles from './filter.module.css';

import { ICategory } from '@/common/@types/category';
import { ISubscription } from '@/common/@types/subscription';
import { IUser } from '@/common/@types/user';

import Arrow from '@/icons/Arrow';

import SelectCustom from '@/components/forms/SelectCustom';

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
  return (
    <>
      <p>Filtrar por:</p>
      <div className={styles.filter}>
        <SelectCustom
          items={subscriptions.map((subscription) => ({
            name: subscription.name,
            value: subscription._id,
            disabled:
              subscription.fullaccess === true &&
              user?.plan.fullaccess === false,
          }))}
          initialValue={user?.plan._id}
          setFilter={setFilterPlan}
          ariaLabel="Filtrar por plano de assinatura"
        />
        <Arrow />
        <SelectCustom
          items={categories.map((category) => ({
            name: category.name,
            value: category.value,
          }))}
          setFilter={setFilterCategory}
          ariaLabel="Filtrar por categoria"
        />
      </div>
    </>
  );
}
