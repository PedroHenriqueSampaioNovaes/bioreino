import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../../utils/ApiError.js';
import { User } from '../../models/UserModel.js';
export class LoginUserService {
    static async execute({ email, password }) {
        const user = await User.findOne({ email }).select('+accountExpiresAfter');
        if (!user) {
            throw new ApiError('E-mail ou senha incorreto.');
        }
        const isTemporaryAccount = !!user.accountExpiresAfter;
        let matchPassword;
        if (isTemporaryAccount) {
            matchPassword = password === user.password;
        }
        else {
            matchPassword = compareSync(password, user.password);
        }
        if (!matchPassword) {
            throw new ApiError('E-mail ou senha incorreto.');
        }
        if (user.status !== 'active') {
            throw new ApiError('Conta inativa. Ative-a efetuando o pagamento da assinatura.');
        }
        const daysForTokenToExpires = 7;
        const tokenExpiresAt = new Date();
        tokenExpiresAt.setDate(tokenExpiresAt.getDate() + daysForTokenToExpires);
        const token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWT_PRIVATE_KEY, { subject: user._id.toString(), expiresIn: `${daysForTokenToExpires}d` });
        return {
            userId: user._id,
            token,
            tokenExpiresAt,
        };
    }
}
