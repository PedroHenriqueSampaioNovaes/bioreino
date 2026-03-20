import { z } from 'zod';
import { ForgotPasswordService } from '../../services/user/ForgotPasswordService.js';
import { sendMail } from '../../modules/mail/sendMail.js';
export class ForgotPasswordController {
    static async handle(req, res, next) {
        try {
            const { user_id } = req;
            const bodyScheme = z.object({
                email: z.string({ required_error: 'O email é obrigatório.' }),
            });
            const bodyData = bodyScheme.parse(req.body);
            const { email, token } = await ForgotPasswordService.execute({
                ...bodyData,
                user_id,
            });
            const message = await sendMail({
                from: 'suporte@bioreino.com.br',
                to: email,
                subject: 'Pedido de redefinição de senha',
                template: 'auth/forgot_password',
                context: { user_email: bodyData.email, token },
            }, 'E-mail de redefinição de senha enviado com sucesso! Por favor, verifique sua caixa de spam.');
            res.json({ message });
        }
        catch (error) {
            next(error);
        }
    }
}
