import { isValidObjectId } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

import { ApiError } from '../../utils/ApiError';

import { User } from '../../models/UserModel';
import { Plan } from '../../models/PlanModel';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  planId: string;
}

export class CreateUserService {
  static async execute({ email, password, name, planId }: IUserRequest) {
    const salt = genSaltSync();
    const passwordHash = hashSync(password, salt);

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new ApiError('E-mail/Senha já existe.', 409);
    }

    if (!isValidObjectId(planId)) {
      throw new ApiError(
        'Houve um erro ao validar o _id do plano de assinatura.'
      );
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      throw new ApiError('Plano de assinatura não encontrado.');
    }

    const user = new User({
      email,
      password: passwordHash,
      name,
      plan: plan._id,
    });
    await user.save();

    return { _id: user._id, email: user.email, password: user.password };
  }
}
