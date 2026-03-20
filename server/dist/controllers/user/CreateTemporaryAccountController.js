import { Types } from 'mongoose';
import { CreateTemporaryAccountService } from '../../services/user/CreateTemporaryAccountService.js';
export class CreateTemporaryAccountController {
    static async handle(req, res, next) {
        try {
            const caracteres = 'abcdefghijklmnopqrstuvwxyz';
            const password = caracteres + '0123456789@!*.';
            const dataUser = {
                name: 'Turista',
                email: '',
                password: '',
                plan: new Types.ObjectId('6577d2cb69c149d4293871ea'),
                payment_method: 'pix',
            };
            for (let i = 0; i < 6; i++) {
                const index = Math.floor(Math.random() * caracteres.length);
                dataUser['email'] += caracteres[index];
            }
            dataUser['email'] += '@bioreino.com';
            for (let i = 0; i < 8; i++) {
                const index = Math.floor(Math.random() * password.length);
                dataUser['password'] += password[index];
            }
            const user = await CreateTemporaryAccountService.execute(dataUser);
            res.status(201).json(user);
        }
        catch (error) {
            next(error);
        }
    }
}
