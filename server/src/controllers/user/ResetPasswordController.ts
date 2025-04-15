import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

import { ResetPasswordService } from '../../services/user/ResetPasswordService';

export class ResetPasswordController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyScheme = z.object({
        email: z.string({ required_error: 'O email é obrigatório.' }),
        token: z.string({
          required_error: 'O token de redefinição de senha é obrigatório.',
        }),
        password: z.string({
          required_error: 'A nova senha é obrigatória.',
        }),
      });

      const bodyData = bodyScheme.parse({ ...req.query, ...req.body });

      await ResetPasswordService.execute({ ...bodyData });

      res.json();
    } catch (error) {
      next(error);
    }
  }
}
