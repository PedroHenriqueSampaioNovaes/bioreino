import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

import { LoginUserService } from '../../services/user/LoginUserService';

export class LoginUserController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyScheme = z.object({
        email: z.string({ required_error: 'O e-mail é obrigatório.' }),
        password: z.string({ required_error: 'A senha é obrigatória.' }),
      });

      const bodyData = bodyScheme.parse(req.body);

      const user = await LoginUserService.execute(bodyData);

      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}
