import { User } from '../../models/UserModel';

export class DetailUserService {
  static async execute(user_id: string) {
    const user = await User.findById(user_id)
      .populate('plan', '-benefits -price')
      .select('-password');

    return user;
  }
}
