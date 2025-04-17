import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

import { CreateUserService } from '../../services/user/CreateUserService';

export class CreateUserController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyScheme = z.object({
        name: z
          .string({ required_error: 'O nome é obrigatório.' })
          .min(5, 'O nome deve ter pelo menos 5 dígitos.'),
        email: z.string({ required_error: 'O e-mail é obrigatório.' }).email(),
        password: z
          .string({ required_error: 'A senha é obrigatória.' })
          .trim()
          .min(8, { message: 'A senha deve ter pelo menos 8 dígitos.' }),
        planId: z.string({
          required_error: 'O plano de assinatura é obrigatório.',
        }),
      });

      const bodyData = bodyScheme.parse(req.body);

      const user = await CreateUserService.execute(bodyData);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
