import { User } from '../../models/UserModel';

import { genSaltSync, hashSync } from 'bcryptjs';

import { ApiError } from '../../utils/ApiError';

interface IResetPassword {
  email: string;
  password: string;
  token: string;
}

export class ResetPasswordService {
  static async execute({ email, token, password }: IResetPassword) {
    const user = await User.findOne({ email }).select(
      '+passwordResetToken +passwordResetExpires'
    );
    if (!user) {
      throw new ApiError('E-mail incorreto.', 400);
    }

    if (user.passwordResetToken !== token) {
      throw new ApiError('Token inválido.', 400);
    }

    if (!user.passwordResetExpires) {
      throw new ApiError(
        'Não foi identificado nenhuma solicitação de redefinição de senha.',
        400
      );
    }

    const now = new Date();
    if (now > user.passwordResetExpires) {
      throw new ApiError('Token expirado.', 400);
    }

    const salt = genSaltSync();
    user.password = hashSync(password, salt);

    await User.findByIdAndUpdate(user.id, user);
  }
}
