import { User } from '../../models/UserModel.js';

export class DetailUserService {
  static async execute(user_id: string) {
    const user = await User.findById(user_id)
      .populate('plan', '-benefits -price -stripe_price_id')
      .select(
        '-password -stripe_customer_id -stripe_subscription -updatedAt -createdAt'
      );

    return user;
  }
}
