import { ApiError } from '../../utils/ApiError';

import { User } from '../../models/UserModel';
import { Plan } from '../../models/PlanModel';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  planId: string;
}

export class CreateTemporaryAccountService {
  static async execute({ email, password, name, planId }: IUserRequest) {
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new ApiError('E-mail/Senha já existe.', 409);
    }

    const plan = await Plan.findById(planId);
    if (!plan) {
      throw new ApiError('Plano de assinatura não encontrado.');
    }

    const now = new Date();
    now.setDate(now.getDate() + 1);

    const user = new User({
      email,
      password,
      name,
      plan: plan._id,
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
