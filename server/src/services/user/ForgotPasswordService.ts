import { User } from '../../models/UserModel.js';

import crypto from 'crypto';

interface IForgotPassword {
  user_id: string;
  email: string;
}

export class ForgotPasswordService {
  static async execute({ email }: IForgotPassword) {
    const user = await User.findOne({ email });
    if (!user) return { token: '', email: '' };

    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);

    await User.findByIdAndUpdate(user._id, {
      $set: { passwordResetToken: token, passwordResetExpires: now },
    });

    return { token, email: user.email };
  }
}
