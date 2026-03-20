import z from 'zod';

import { basePaymentMethodSchema } from './payments.js';

export const bodyScheme = z
  .object({
    name: z
      .string({ required_error: 'O nome é obrigatório.' })
      .min(5, 'O nome deve ter pelo menos 5 dígitos.'),
    email: z
      .string({ required_error: 'O e-mail é obrigatório.' })
      .email('E-mail inválido'),
    password: z
      .string({ required_error: 'A senha é obrigatória.' })
      .trim()
      .min(8, { message: 'A senha deve ter pelo menos 8 dígitos.' }),
    confirm_password: z
      .string({ required_error: 'A confirmação de senha é obrigatória.' })
      .trim(),
    cpf: z
      .string({ required_error: 'O CPF é obrigatório.' })
      .regex(/[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/, 'CPF incorreto'),
    subscriptionId: z.string({
      required_error: 'O plano de assinatura é obrigatório.',
    }),
    ...basePaymentMethodSchema.shape,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'As senhas não conferem.',
    path: ['confirm_password'],
  })
  .superRefine((data, ctx) => {
    if (
      data.payment_method === 'bank_slip' ||
      data.payment_method === 'credit_card'
    ) {
      const fieldsBankSlip = [
        'state',
        'cep',
        'street',
        'home_number',
        'neighborhood',
      ] as const;

      fieldsBankSlip.forEach((field) => {
        if (!data[field]) {
          ctx.addIssue({
            path: [field],
            message: 'Preencha este campo',
            code: z.ZodIssueCode.custom,
          });
        }
      });

      if (data.cep && /[0-9]{5}-[0-9]{3}/.test(data.cep) === false) {
        ctx.addIssue({
          path: ['cep'],
          message: 'CEP incorreto',
          code: z.ZodIssueCode.custom,
        });
      }
    }

    if (data.payment_method === 'credit_card') {
      const fieldsCard = [
        'card_number',
        'cardholder_name',
        'validate',
        'cvv',
        'installment',
      ] as const;

      fieldsCard.forEach((field) => {
        if (!data[field]) {
          ctx.addIssue({
            path: [field],
            message: 'Preencha este campo',
            code: z.ZodIssueCode.custom,
          });
        }
      });

      if (
        data.card_number &&
        /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(data.card_number) === false
      ) {
        ctx.addIssue({
          path: ['card_number'],
          message: 'Número do cartão inválido',
          code: 'custom',
        });
      }

      if (
        data.validate &&
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.validate) === false
      ) {
        ctx.addIssue({
          path: ['validate'],
          message: 'Data inválida. Use mm/aa',
          code: 'custom',
        });
      }

      if (data.cvv && /^\d{3}$/.test(data.cvv) === false) {
        ctx.addIssue({
          path: ['cvv'],
          message: 'CVV inválido',
          code: 'custom',
        });
      }
    }
  });
