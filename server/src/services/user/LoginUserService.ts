import { compareSync } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { ApiError } from '../../utils/ApiError';

import { User } from '../../models/UserModel';

interface ILoginRequest {
  email: string;
  password: string;
}

export class LoginUserService {
  static async execute({ email, password }: ILoginRequest) {
    const user = await User.findOne({ email }).select('+accountExpiresAfter');
    if (!user) {
      throw new ApiError('E-mail ou senha incorreto.');
    }

    // compare the password with db password if it's not a temporary account
    if (user.accountExpiresAfter === undefined) {
      const matchPassword = compareSync(password, user.password);
      if (!matchPassword) {
        throw new ApiError('E-mail ou senha incorreto.');
      }
    }

    const daysForTokenToExpires = 7;
    const tokenExpiresAt = new Date();
    tokenExpiresAt.setDate(tokenExpiresAt.getDate() + daysForTokenToExpires);
    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.JWT_PRIVATE_KEY as string,
      { subject: user._id.toString(), expiresIn: `${daysForTokenToExpires}d` }
    );

    return {
      userId: user._id,
      token,
      tokenExpiresAt,
    };
  }
}
