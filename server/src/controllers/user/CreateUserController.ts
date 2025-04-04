import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserService } from '../../services/user/CreateUserService';

export class CreateUserController {
  static handle(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyScheme = z.object({
        email: z.string({ required_error: 'O e-mail é obrigatório.' }).email(),
        password: z
          .string({ required_error: 'A senha é obrigatória.' })
          .trim()
          .min(8, { message: 'A senha deve ter pelo menos 8 dígitos' }),
      });

      // AINDA FALTA DESESTRUTURAR ALGUNS DADOS DE USUÁRIO
      const { email, password } = bodyScheme.parse(req.body);

      res.status(200).json({ ok: true });
    } catch (error) {
      next(error);
    }
  }
}
