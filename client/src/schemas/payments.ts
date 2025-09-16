import z from 'zod';
import { basePersonalDataSchema, personalDataRefine } from './personalData';

export function paymentMethodRefine<T extends z.ZodTypeAny>(
  data: z.infer<T>,
  ctx: z.RefinementCtx
) {
  if (data.payment_method === '') {
    ctx.addIssue({
      path: ['payment_method'],
      message: 'Escolha uma forma de pagamento válida',
      code: z.ZodIssueCode.custom,
    });
  }

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
}

export const personalDataSchema =
  basePersonalDataSchema.superRefine(personalDataRefine);

export const subscriptionSchema = z.object({
  subscription: z.string().nonempty('Escolha uma opção'),
});

export const basePaymentMethodSchema = z.object({
  payment_method: z.enum(['pix', 'credit_card', 'bank_slip', 'stripe', '']),
  state: z.string().optional(),
  cep: z.string().optional(),
  street: z.string().optional(),
  home_number: z.string().optional(),
  neighborhood: z.string().optional(),
  card_number: z.string().optional(),
  cardholder_name: z.string().optional(),
  validate: z.string().optional(),
  cvv: z.string().optional(),
  installment: z.string().optional(),
});

export const paymentMethodSchema =
  basePaymentMethodSchema.superRefine(paymentMethodRefine);
