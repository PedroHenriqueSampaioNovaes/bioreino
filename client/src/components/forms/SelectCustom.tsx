'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import styles from './selectCustom.module.css';
import stylesInput from './input.module.css';
import classNames from 'classnames';

import { IoCheckmark, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Select } from '@base-ui-components/react/select';
import { useController, UseControllerProps } from 'react-hook-form';

import Label from './Label';
import ErrorMessage from './ErrorMessage';

function findOption(
  options: { label: string; value: string | null }[],
  target: string | null
) {
  return options.find((option) => option.value === target);
}

interface IDefault {
  items: { label: string; value: string | null; disabled?: boolean }[];
  initialValue?: string;
  setFilter: Dispatch<SetStateAction<string | null>>;
  ariaLabel: string;
}

export function Default({
  items,
  initialValue,
  setFilter,
  ariaLabel,
}: IDefault) {
  const [isOpen, setIsOpen] = useState(false);

  const initialOption =
    (initialValue && findOption(items, initialValue)) || items[0];

  return (
    <Select.Root
      items={items}
      defaultValue={initialOption.value}
      onOpenChange={(open) => setIsOpen(open)}
      onValueChange={(value) => setFilter(value)}
    >
      <Select.Trigger className={styles.Select} aria-label={ariaLabel}>
        <Select.Value className={styles.TriggerValue} />
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
                key={item.label}
                className={styles.Item}
                value={item.value}
                disabled={item.disabled}
              >
                <Select.ItemIndicator className={styles.ItemIndicator}>
                  <IoCheckmark className={styles.ItemIndicatorIcon} />
                </Select.ItemIndicator>
                <Select.ItemText className={styles.ItemText}>
                  {item.label}
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

interface IControlled {
  items: { label: string; value: string | null; disabled?: boolean }[];
  initialValue?: string;
  ariaLabel: string;
  id: string;
  controller: UseControllerProps;
}

export function Controlled({
  items,
  initialValue,
  ariaLabel,
  id,
  controller,
}: IControlled) {
  const [isOpen, setIsOpen] = useState(false);

  const { field, fieldState } = useController(controller);

  const option = (initialValue && findOption(items, initialValue)) || items[0];

  return (
    <>
      <Select.Root
        items={items}
        name={field.name}
        value={field.value || option.value}
        onOpenChange={setIsOpen}
        onValueChange={field.onChange}
        id={id}
        inputRef={field.ref}
      >
        <Select.Trigger
          className={classNames(styles.Select, {
            [stylesInput.error]: fieldState.error,
          })}
          aria-label={ariaLabel}
          onBlur={field.onBlur}
        >
          <Select.Value className={styles.TriggerValue} />
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
                  key={item.label}
                  className={styles.Item}
                  value={item.value}
                  disabled={item.disabled}
                >
                  <Select.ItemIndicator className={styles.ItemIndicator}>
                    <IoCheckmark className={styles.ItemIndicatorIcon} />
                  </Select.ItemIndicator>
                  <Select.ItemText className={styles.ItemText}>
                    {item.label}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Popup>
            <Select.ScrollDownArrow className={styles.ScrollArrow} />
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>

      {fieldState.error && (
        <ErrorMessage customClassName={stylesInput.errorMessage}>
          {fieldState.error.message}
        </ErrorMessage>
      )}
    </>
  );
}

interface IWithLabel extends IControlled {
  id: string;
  label: string;
}

// Component with label
export function WithLabel({ id, label, ...props }: IWithLabel) {
  return (
    <div className={styles.wrapper}>
      <Label htmlFor={id} label={label}>
        <Controlled {...props} id={id} />
      </Label>
    </div>
  );
}

const SelectCustom = {
  Default,
  WithLabel,
  Controlled,
};

export default SelectCustom;
