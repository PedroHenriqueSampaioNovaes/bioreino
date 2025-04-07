import { isValidObjectId } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

import { ApiError } from '../../utils/ApiError';

import { User } from '../../models/UserModel';
import { SubscriptionPlan } from '../../models/SubscriptionPlanModel';

interface UserRequest {
  name: string;
  email: string;
  password: string;
  plan: string;
}

export class CreateUserService {
  static async execute({ email, password, name, plan }: UserRequest) {
    const salt = genSaltSync();
    const passwordHash = hashSync(password, salt);

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new ApiError('E-mail/Senha já existe.');
    }

    if (!isValidObjectId(plan)) {
      throw new ApiError(
        'Houve um erro ao validar o _id do plano de assinatura.'
      );
    }

    const planAlreadyExists = await SubscriptionPlan.findById(plan);
    if (!planAlreadyExists) {
      throw new ApiError('Plano de assinatura não encontrado.');
    }

    const user = new User({
      email,
      password: passwordHash,
      name,
      plan: planAlreadyExists._id,
    });
    await user.save();

    return { _id: user._id, email: user.email, password: user.password };
  }
}
