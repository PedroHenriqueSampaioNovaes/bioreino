'use client';

import { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import type { CreateAccountFormValues } from '@/schemas/createAccountSchema';

import formatCurrency from '@/common/utils/formatCurrency';

import Input from '../forms/Input';
import FieldSplit from '../forms/FieldSplit';
import Select from '../forms/Select';

function getInstallments(price: number) {
  const installments: { label: string; value: string }[] = [];

  for (let i = 1; i <= 12; i++) {
    const installment = price / i;
    installments.push({
      label: `${i}x de ${formatCurrency(installment)}`,
      value: String(i),
    });
  }

  return installments;
}

interface ICreditCardForm {
  price: number;
}

export default function CreditCardForm({ price }: ICreditCardForm) {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateAccountFormValues>();
  const registerWithMask = useHookFormMask(register);

  function formatValidityField(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const firstNumberOfTheMonth = Number(value.charAt(0));
    const firstTwoNumbersOfTheMonth = Number(value.slice(0, 2));
    if (firstNumberOfTheMonth > 1) {
      setValue('validate', `0${firstNumberOfTheMonth}`);
    } else if (firstTwoNumbersOfTheMonth > 12) {
      setValue('validate', '12');
    }
  }

  const installments = getInstallments(price);

  return (
    <>
      <Input
        label="Número do cartão *"
        {...registerWithMask('card_number', '9999 9999 9999 9999', {
          jitMasking: true,
        })}
        error={errors.card_number?.message}
      />
      <FieldSplit>
        <Input
          label="Nome do portador *"
          {...register('cardholder_name')}
          error={errors.cardholder_name?.message}
        />
        <Input
          label="Validade (mm/aa) *"
          {...registerWithMask('validate', '99/99', {
            jitMasking: true,
            onChange: formatValidityField,
          })}
          error={errors.validate?.message}
        />
      </FieldSplit>
      <FieldSplit>
        <Input
          label="Código de segurança *"
          {...registerWithMask('cvv', '999', { jitMasking: true })}
          error={errors.cvv?.message}
        />
        <Select.ControlledByRHF
          id="installments"
          ariaLabel="Parcele em até 12 vezes sem juros"
          label="Parcelas (12x sem juros)"
          items={[
            { label: 'Selecione', value: '', disabled: true },
            ...installments,
          ]}
          controller={{ name: 'installment', control }}
        />
      </FieldSplit>
    </>
  );
}
