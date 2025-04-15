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
    const user = await User.findOne({ email }).populate(
      'plan',
      '-benefits -price'
    );
    if (!user) {
      throw new ApiError('E-mail ou senha incorreto.', 400);
    }

    // compare password with db password
    const matchPassword = compareSync(password, user.password);
    if (!matchPassword) {
      throw new ApiError('E-mail ou senha incorreto.');
    }

    const token = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_PRIVATE_KEY as string,
      { subject: user._id.toString(), expiresIn: '7d' }
    );

    return {
      token,
      _id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
    };
  }
}
