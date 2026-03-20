import { z } from 'zod';
import { UpdateUserService } from '../../services/user/UpdateUserService.js';
import { basePaymentMethodSchema } from '../../schema/payments.js';
export class UpdateUserController {
    static async handle(req, res, next) {
        try {
            const { user_id } = req;
            const bodyScheme = z.object({
                subscriptionId: z.string({
                    required_error: 'O _id do plano de assinatura é obrigatório.',
                }),
                payment_method: basePaymentMethodSchema.shape.payment_method,
            });
            const bodyData = bodyScheme.parse(req.body);
            const updatedUser = await UpdateUserService.execute({
                ...bodyData,
                user_id,
            });
            res.json(updatedUser);
        }
        catch (error) {
            next(error);
        }
    }
}
