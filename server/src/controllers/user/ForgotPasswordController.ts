import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

import { ForgotPasswordService } from '../../services/user/ForgotPasswordServiceService';
import { sendMail } from '../../modules/sendMail';

export class ForgotPasswordController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req;

      const bodyScheme = z.object({
        email: z.string({ required_error: 'O email é obrigatório.' }),
      });

      const bodyData = bodyScheme.parse(req.body);

      const { token } = await ForgotPasswordService.execute({
        ...bodyData,
        user_id,
      });

      const message = await sendMail(
        {
          from: 'suporte@bioreino.com.br',
          to: 'pedrohenriquesampaiodenovaes@gmail.com',
          subject: 'Pedido de redefinição de senha',
          template: 'auth/forgot_password',
          context: { user_email: bodyData.email, token },
        },
        'E-mail de redefinição de senha enviado com sucesso! Por favor, verifique sua caixa de spam.'
      );

      res.json({ message });
    } catch (error) {
      next(error);
    }
  }
}
