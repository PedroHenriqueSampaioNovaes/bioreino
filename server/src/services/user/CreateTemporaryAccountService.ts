import { ApiError } from '../../utils/ApiError';

import { IUser, User } from '../../models/UserModel';
import { Plan } from '../../models/PlanModel';

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

    const now = new Date();
    now.setDate(now.getDate() + 1);

    const user = new User({
      email,
      password,
      name,
      plan: plan._id,
      payment_method,
      accountExpiresAfter: now,
    });
    await user.save();

    return {
      _id: user._id,
      email: user.email,
      password: user.password,
      accountExpiresAfter: now,
    };
  }
}
