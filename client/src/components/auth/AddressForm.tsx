'use client';

import { FocusEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

import type { IStateBrazil } from '@/context/StatesContext';
import type { CreateAccountFormValues } from '@/schemas/createAccountSchema';

import Input from '../forms/Input';
import SelectCustom from '../forms/SelectCustom';

interface IAddressFormProps {
  states: IStateBrazil[];
}

export default function AddressForm({ states }: IAddressFormProps) {
  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<CreateAccountFormValues>();
  const registerWithMask = useHookFormMask(register);

  async function handleZipcodeBlur(e: FocusEvent<HTMLInputElement>) {
    const zipcode = e.currentTarget.value;
    if (!zipcode) return;

    const response = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipcode}`
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
    <>
      <Input
        label="CEP *"
        {...registerWithMask('cep', '99999-999', {
          jitMasking: true,
          onBlur: handleZipcodeBlur,
        })}
        error={errors.cep?.message}
      />

      <SelectCustom.Uncontrolled
        items={[
          { label: 'Selecione um estado', value: '', disabled: true },
          ...listState,
        ]}
        ariaLabel="Filtrar por estado"
        label="Estado *"
        id="state"
        controller={{ name: 'state' }}
      />

      <Input
        label="Endereço *"
        {...register('street')}
        error={errors.street?.message}
      />
      <Input
        label="Número *"
        {...register('home_number')}
        error={errors.home_number?.message}
      />
      <Input
        label="Bairro *"
        {...register('neighborhood')}
        error={errors.neighborhood?.message}
      />
    </>
  );
}
