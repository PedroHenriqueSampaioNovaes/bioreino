import z from 'zod';

export const basePaymentMethodSchema = z.object({
  payment_method: z.enum(['pix', 'credit_card', 'bank_slip', 'stripe'], {
    required_error: 'O método de pagamento é obrigatório.',
    message: 'Escolha um método de pagamento válido.',
  }),
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
