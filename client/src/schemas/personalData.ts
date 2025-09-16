import z from 'zod';

export function personalDataRefine<T extends z.ZodTypeAny>(
  data: z.infer<T>,
  ctx: z.RefinementCtx
) {
  if (data.password !== data.confirm_password) {
    ctx.addIssue({
      path: ['confirm_password'],
      message: 'As senhas devem ser iguais',
      code: z.ZodIssueCode.custom,
    });
  }
}

export const basePersonalDataSchema = z.object({
  name: z.string().min(5, 'O nome deve ter pelo menos 5 dígitos'),
  email: z.string().nonempty('Preencha este campo').email('E-mail inválido'),
  cpf: z
    .string()
    .nonempty('Preencha este campo')
    .regex(/[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/, 'CPF incorreto'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
  confirm_password: z.string().nonempty('Preencha este campo'),
});
