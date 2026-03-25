'use client';

import { FocusEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import z from 'zod';

import styles from './addressForm.module.css';

import type { IStateBrazil } from '@/context/StatesContext';

import { basePaymentMethodSchema } from '@/schemas/payments';

import Input from '../forms/Input';
import Select from '../forms/Select';

type AddressFormValues = z.infer<typeof basePaymentMethodSchema>;

interface IAddressFormProps {
  states: IStateBrazil[];
}

export default function AddressForm({ states }: IAddressFormProps) {
  const { control, setValue, trigger } = useFormContext<AddressFormValues>();

  async function handleZipcodeBlur(value: string) {
    const zipcode = value;
    if (!zipcode) return;

    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipcode}`,
    );

    if (response.ok) {
      const data = await response.json();

      setValue('state', data.state);
      setValue('neighborhood', data.neighborhood);
      setValue('street', data.street);

      await trigger(['state', 'neighborhood', 'street']);
    }
  }

  const listState = states.map((state) => ({
    label: state.nome,
    value: state.sigla,
  }));

  return (
    <div className={styles.addressForm}>
      <Input
        label="CEP *"
        control={control}
        name="cep"
        mask="99999-999"
        maskOptions={{ jitMasking: true }}
        onChange={handleZipcodeBlur}
      />

      <Select.ControlledByRHF
        items={[
          { label: 'Selecione um estado', value: '', disabled: true },
          ...listState,
        ]}
        ariaLabel="Filtrar por estado"
        label="Estado *"
        id="state"
        controller={{ name: 'state' }}
      />

      <Input label="Endereço *" control={control} name="street" />
      <Input label="Número *" control={control} name="home_number" />
      <Input label="Bairro *" control={control} name="neighborhood" />
    </div>
  );
}
