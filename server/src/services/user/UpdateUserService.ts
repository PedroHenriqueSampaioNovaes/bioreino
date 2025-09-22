import { ApiError } from '../../utils/ApiError';

import { stripe } from '../../config/stripe';

import { paymentMethods, User } from '../../models/UserModel';
import { Plan } from '../../models/PlanModel';

import updateStripeUserAccount from '../../utils/updateStripeUserAccount';

interface IUpdateUserRequest {
  subscriptionId: string;
  payment_method: (typeof paymentMethods)[number];
  user_id: string;
}

export class UpdateUserService {
  static async execute({
    subscriptionId,
    payment_method,
    user_id,
  }: IUpdateUserRequest) {
    const userData = await User.findById(user_id);
    if (!userData) {
      throw new ApiError('Não foi possível encontrar o usuário.');
    }

    const subscription = await Plan.findById(subscriptionId);
    if (!subscription) {
      throw new ApiError(
        'Não foi possível encontrar este plano de assinatura.'
      );
    }

    if (userData.plan._id.toString() === subscription._id.toString()) {
      throw new ApiError(
        'Este usuário já possui o plano de assinatura selecionado.'
      );
    }

    // CANCEL SUBSCRIPTION ON STRIPE IF THE USER CHANGED THEIR PAYMENT METHOD FROM STRIPE TO ANOTHER
    if (payment_method !== 'stripe' && userData.stripe_subscription) {
      await stripe.subscriptions.cancel(userData.stripe_subscription.id);
    }

    let stripeURL = null;
    let customerId = userData.stripe_customer_id;

    if (payment_method === 'stripe') {
      // CREATE OR UPDATE CUSTOMER ON STRIPE
      const { url, stripeCustomerId } = await updateStripeUserAccount(
        userData,
        subscription.stripe_price_id
      );

      stripeURL = url;
      customerId = stripeCustomerId ?? customerId;
    } else {
      userData.plan = subscription._id;
    }

    userData.payment_method = payment_method;
    userData.stripe_customer_id = customerId;

    const updatedUser = await User.findByIdAndUpdate(user_id, userData, {
      new: true,
    })
      .select('+name email plan status payment_method')
      .populate('plan', '-benefits -price -stripe_price_id');

    return { updatedUser, stripeURL };
  }
}
