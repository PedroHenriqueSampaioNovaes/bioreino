import z from 'zod';

export const subscriptionSchema = z.object({
  subscription: z.string().nonempty('Escolha uma opção'),
});
