import { ApiError } from '../../utils/ApiError.js';

import { IUser, User } from '../../models/UserModel.js';
import { Plan } from '../../models/PlanModel.js';

export class CreateTemporaryAccountService {
  static async execute({
    email,
    password,
    name,
    plan: planId,
    payment_method,
  }: IUser) {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new ApiError('E-mail já existe', 409);
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      throw new ApiError('Ocorreu um problema ao tentar obter a assinatura');
    }

    const accountExpiresAfter = new Date(
      Date.now() + 24 * 60 * 60 * 1000 - 30000,
    );

    const user = new User({
      email,
      password,
      name,
      plan: plan._id,
      status: 'active',
      payment_method,
      accountExpiresAfter,
    });
    await user.save();

    return {
      _id: user._id,
      email: user.email,
      password: user.password,
      accountExpiresAfter,
    };
  }
}
