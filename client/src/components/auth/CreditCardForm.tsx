'use client';

import { useFormContext } from 'react-hook-form';
import z from 'zod';

import formatCurrency from '@/common/utils/formatCurrency';

import { basePaymentMethodSchema } from '@/schemas/payments';

import Input from '../forms/Input';
import FieldSplit from '../forms/FieldSplit';
import Select from '../forms/Select';

type CardFormValues = z.infer<typeof basePaymentMethodSchema>;

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
  const { control, setValue } = useFormContext<CardFormValues>();

  function formatValidityField(value: string) {
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
        mask="9999 9999 9999 9999"
        maskOptions={{ jitMasking: true }}
        control={control}
        name="card_number"
      />
      <FieldSplit>
        <Input
          label="Nome do portador *"
          control={control}
          name="cardholder_name"
        />
        <Input
          label="Validade (mm/aa) *"
          mask="99/99"
          maskOptions={{ jitMasking: true }}
          onChange={formatValidityField}
          control={control}
          name="validate"
        />
      </FieldSplit>
      <FieldSplit>
        <Input
          label="Código de segurança *"
          mask="999"
          maskOptions={{ jitMasking: true }}
          control={control}
          name="cvv"
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
