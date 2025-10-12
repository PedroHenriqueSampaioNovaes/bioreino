'use client';

import { Dispatch, memo, SetStateAction, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import classNames from 'classnames';
import styles from './select.module.css';
import stylesInput from './input.module.css';
import stylesLabel from './label.module.css';

import { IoCheckmark, IoChevronDown, IoChevronUp } from 'react-icons/io5';
import { Select } from '@base-ui-components/react/select';
import { Field } from '@base-ui-components/react/field';

import ErrorMessage from './ErrorMessage';

export interface ISelectItemBase {
  label: string;
  value: string;
  disabled?: boolean;
  onSelectOption?: () => void;
}

export interface ISelectItem {
  label: string;
  value: string;
  disabled?: boolean;
}

function findOption<T extends Pick<ISelectItemBase, 'label' | 'value'>>(
  options: T[],
  target: string | null
) {
  return options.find((option) => option.value === target);
}

function renderSelectItems(items: ISelectItemBase[]) {
  return items.map(({ label, value, disabled = false, onSelectOption }) => (
    <Select.Item
      key={label}
      className={classNames(styles.Item, {
        [styles.disabled]: !!onSelectOption,
      })}
      value={value}
      disabled={disabled}
    >
      <Select.ItemIndicator className={styles.ItemIndicator}>
        <IoCheckmark className={styles.ItemIndicatorIcon} />
      </Select.ItemIndicator>
      <Select.ItemText className={styles.ItemText}>{label}</Select.ItemText>
    </Select.Item>
  ));
}

interface IControlled {
  items: ISelectItem[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  className?: string;
}

export function Controlled({
  items,
  value,
  setValue,
  ariaLabel,
  className,
}: IControlled) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root
      items={items}
      onOpenChange={(open) => setIsOpen(open)}
      value={value}
      onValueChange={(value) => setValue(value)}
    >
      <Select.Trigger
        className={classNames(styles.Select, className)}
        aria-label={ariaLabel}
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
            {renderSelectItems(items)}
          </Select.Popup>
          <Select.ScrollDownArrow className={styles.ScrollArrow} />
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

interface IControlledInternally {
  items: ISelectItemBase[];
  initialValue?: string;
  setStateValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
  className?: string;
}

export function ControlledInternally({
  items,
  initialValue,
  setStateValue,
  ariaLabel,
  className,
}: IControlledInternally) {
  const initialOption =
    (initialValue && findOption(items, initialValue)?.value) || items[0]?.value;

  const [currentValue, setCurrentValue] = useState(initialOption);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select.Root
      items={items}
      value={currentValue}
      onOpenChange={(open) => setIsOpen(open)}
      onValueChange={(value) => {
        if (value === currentValue) return;

        const optionSelected = findOption(items, value);

        if (optionSelected?.onSelectOption) {
          optionSelected.onSelectOption();
        } else {
          setCurrentValue(value);
          setStateValue(value);
        }
      }}
    >
      <Select.Trigger
        className={classNames(styles.Select, className)}
        aria-label={ariaLabel}
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
            {renderSelectItems(items)}
          </Select.Popup>
          <Select.ScrollDownArrow className={styles.ScrollArrow} />
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}

interface IControlledByRHF<T extends FieldValues> {
  items: ISelectItem[];
  label: string;
  ariaLabel: string;
  id: string;
  controller: UseControllerProps<T>;
  className?: string;
}

export function ControlledByRHF<T extends FieldValues>({
  items,
  ariaLabel,
  label,
  id,
  controller,
  className,
}: IControlledByRHF<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const { field, fieldState } = useController(controller);

  return (
    <Field.Root className={stylesLabel.wrapper}>
      <Field.Label className={classNames(stylesLabel.label, styles.Label)}>
        {label}
      </Field.Label>

      <Select.Root
        items={items}
        name={field.name}
        value={field.value as string}
        onOpenChange={setIsOpen}
        onValueChange={field.onChange}
        id={id}
        inputRef={field.ref}
      >
        <Select.Trigger
          className={classNames(styles.Select, className, {
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
              {renderSelectItems(items)}
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
    </Field.Root>
  );
}

const SelectCustom = {
  Controlled: memo(Controlled),
  ControlledByRHF: memo(ControlledByRHF),
  ControlledInternally: memo(ControlledInternally),
};

export default SelectCustom;
