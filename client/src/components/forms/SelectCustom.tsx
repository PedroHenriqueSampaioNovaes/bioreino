'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import styles from './selectCustom.module.css';
import { IoCheckmark, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Select } from '@base-ui-components/react/select';

interface ISelectCustom {
  items: { name: string; value: string; disabled?: boolean }[];
  initialValue?: string;
  setFilter: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

export default function SelectCustom({
  items,
  initialValue,
  setFilter,
  ariaLabel,
}: ISelectCustom) {
  const [isOpen, setIsOpen] = useState(false);

  const option =
    (initialValue && items.find((item) => item.value === initialValue)) ||
    items[0];

  return (
    <Select.Root
      defaultValue={option.value}
      onOpenChange={(open) => setIsOpen(open)}
      onValueChange={(value) => setFilter(value)}
    >
      <Select.Trigger className={styles.Select} aria-label={ariaLabel}>
        <Select.Value
          placeholder={option.name}
          className={styles.TriggerValue}
        />
        <Select.Icon className={styles.SelectIcon}>
          {isOpen ? <IoChevronUp /> : <IoChevronDown />}
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner
          className={styles.Positioner}
          alignItemWithTrigger={false}
          sideOffset={2}
        >
          <Select.ScrollUpArrow className={styles.ScrollArrow} />
          <Select.Popup className={styles.Popup}>
            {items.map((item) => (
              <Select.Item
                key={item.value}
                className={styles.Item}
                value={item.value}
                disabled={item.disabled}
              >
                <Select.ItemIndicator className={styles.ItemIndicator}>
                  <IoCheckmark className={styles.ItemIndicatorIcon} />
                </Select.ItemIndicator>
                <Select.ItemText className={styles.ItemText}>
                  {item.name}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Popup>
          <Select.ScrollDownArrow className={styles.ScrollArrow} />
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
