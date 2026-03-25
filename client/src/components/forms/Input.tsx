'use client';

import { useCallback } from 'react';
import { FieldControl, FieldError, FieldLabel, FieldRootUi } from '../ui/Field';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { Options, withMask } from 'use-mask-input';

export interface InputProps<T extends FieldValues> extends UseControllerProps<T> {
  label: string;
  mask?: string | string[];
  maskOptions?: Options;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  onChange?: (value: string) => void;
}

function Input<T extends FieldValues>({
  label,
  mask,
  maskOptions,
  type,
  placeholder,
  onChange,
  ...props
}: InputProps<T>) {
  const { field, fieldState } = useController(props);

  const setRefs = useCallback(
    (node: HTMLInputElement | null) => {
      field.ref(node);

      if (mask && node) {
        withMask(mask, maskOptions)(node);
      }
    },
    [field, mask, maskOptions],
  );

  const handleValueChange = (val: string) => {
    field.onChange(val);

    if (onChange) {
      onChange(val);
    }
  };

  return (
    <FieldRootUi
      name={field.name}
      invalid={fieldState.invalid}
      touched={fieldState.isTouched}
      dirty={fieldState.isDirty}
    >
      <FieldLabel>{label}</FieldLabel>

      <FieldControl
        ref={setRefs}
        value={field.value}
        onBlur={field.onBlur}
        onValueChange={handleValueChange}
        type={type}
        placeholder={placeholder}
        disabled={field.disabled}
      />

      <FieldError match={!!fieldState.error}>
        {fieldState.error?.message}
      </FieldError>
    </FieldRootUi>
  );
}

export default Input;
