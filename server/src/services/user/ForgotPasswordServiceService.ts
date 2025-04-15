import { User } from '../../models/UserModel';

import { ApiError } from '../../utils/ApiError';

import crypto from 'crypto';

interface IForgotPassword {
  user_id: string;
  email: string;
}

export class ForgotPasswordService {
  static async execute({ email }: IForgotPassword) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError('Usuário não encontrado.', 400);
    }

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);

    await User.findByIdAndUpdate(user._id, {
      $set: { passwordResetToken: token, passwordResetExpires: now },
    });

    return { token };
  }
}
