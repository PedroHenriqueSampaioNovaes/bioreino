'use client';

import { useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import classNames from 'classnames';
import styles from './select.module.css';
import stylesInput from './input.module.css';

import { IoCheckmark, IoChevronDown, IoChevronUp } from 'react-icons/io5';

import {
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectRootUi,
  SelectTrigger,
  SelectValue,
} from '../ui/Select';
import { FieldError, FieldLabel, FieldRootUi } from '../ui/Field';

export interface ISelectItems {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface ISelectItemsControlled extends ISelectItems {
  onSelectOptionDisabled?: () => void;
}

function getOptionData<T extends Pick<ISelectItems, 'label' | 'value'>>(
  options: T[],
  target: string | null,
) {
  return options.find((option) => option.value === target);
}

function renderSelectItemsControlled(items: ISelectItemsControlled[]) {
  return items.map(
    ({ label, value, disabled = false, onSelectOptionDisabled }) => (
      <SelectItem
        key={label}
        className={classNames({
          [styles.disabled]: disabled || !!onSelectOptionDisabled,
        })}
        value={value}
        disabled={disabled}
      >
        <SelectItemIndicator>
          <IoCheckmark />
        </SelectItemIndicator>
        <SelectItemText>{label}</SelectItemText>
      </SelectItem>
    ),
  );
}

interface IControlled {
  items: ISelectItemsControlled[];
  valueData?: string | null;
  onValueChange: (value: string | null) => void;
  ariaLabel: string;
}

export function Controlled({
  items,
  valueData,
  onValueChange,
  ariaLabel,
}: IControlled) {
  const [value, setValue] = useState(valueData);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectRootUi
      items={items}
      value={value}
      onOpenChange={(open) => setIsOpen(open)}
      onValueChange={(newValue) => {
        if (newValue === value) return;

        const optionSelected = getOptionData(items, newValue);

        if (optionSelected?.onSelectOptionDisabled) {
          optionSelected.onSelectOptionDisabled();
        } else {
          setValue(newValue);
          onValueChange(newValue);
        }
      }}
    >
      <SelectTrigger aria-label={ariaLabel}>
        <SelectValue />
        <SelectIcon>{isOpen ? <IoChevronUp /> : <IoChevronDown />}</SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectPositioner alignItemWithTrigger={false} sideOffset={2}>
          <SelectPopup>
            <SelectList>{renderSelectItemsControlled(items)}</SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </SelectRootUi>
  );
}

interface IUncontrolled {
  items: ISelectItems[];
  defaultValue?: string;
  onValueChange: (value: string | null) => void;
  ariaLabel: string;
}

export function Uncontrolled({
  items,
  defaultValue,
  onValueChange,
  ariaLabel,
}: IUncontrolled) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectRootUi
      items={items}
      defaultValue={defaultValue}
      onOpenChange={(open) => setIsOpen(open)}
      onValueChange={(newValue) => onValueChange(newValue)}
    >
      <SelectTrigger aria-label={ariaLabel}>
        <SelectValue />
        <SelectIcon>{isOpen ? <IoChevronUp /> : <IoChevronDown />}</SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectPositioner alignItemWithTrigger={false} sideOffset={2}>
          <SelectPopup>
            <SelectList>
              {items.map(({ label, value, disabled = false }) => (
                <SelectItem key={label} value={value} disabled={disabled}>
                  <SelectItemIndicator>
                    <IoCheckmark />
                  </SelectItemIndicator>
                  <SelectItemText>{label}</SelectItemText>
                </SelectItem>
              ))}
            </SelectList>
          </SelectPopup>
        </SelectPositioner>
      </SelectPortal>
    </SelectRootUi>
  );
}

interface IControlledByRHF<T extends FieldValues> {
  items: ISelectItemsControlled[];
  label: string;
  ariaLabel: string;
  id: string;
  controller: UseControllerProps<T>;
}

export function ControlledByRHF<T extends FieldValues>({
  items,
  ariaLabel,
  label,
  id,
  controller,
}: IControlledByRHF<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const { field, fieldState } = useController(controller);

  return (
    <FieldRootUi>
      <FieldLabel>{label}</FieldLabel>

      <SelectRootUi
        items={items}
        name={field.name}
        value={field.value}
        onOpenChange={setIsOpen}
        onValueChange={field.onChange}
        id={id}
        inputRef={field.ref}
      >
        <SelectTrigger
          className={classNames({
            [stylesInput.error]: !!fieldState.error,
          })}
          aria-label={ariaLabel}
          onBlur={field.onBlur}
        >
          <SelectValue />
          <SelectIcon>
            {isOpen ? <IoChevronUp /> : <IoChevronDown />}
          </SelectIcon>
        </SelectTrigger>

        <SelectPortal>
          <SelectPositioner alignItemWithTrigger={false} sideOffset={2}>
            <SelectPopup>
              <SelectList>{renderSelectItemsControlled(items)}</SelectList>
            </SelectPopup>
          </SelectPositioner>
        </SelectPortal>
      </SelectRootUi>

      <FieldError match={!!fieldState.error}>
        {fieldState.error?.message}
      </FieldError>
    </FieldRootUi>
  );
}

const SelectCustom = {
  Controlled,
  Uncontrolled,
  ControlledByRHF,
};

export default SelectCustom;
