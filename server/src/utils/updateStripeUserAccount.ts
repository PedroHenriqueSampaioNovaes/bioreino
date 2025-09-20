import { Document, Types } from 'mongoose';

import { IUser } from '../models/UserModel';
import { stripe } from '../config/stripe';

type UserDocument = Document<unknown, {}, IUser> &
  IUser & {
    _id: Types.ObjectId;
  } & {
    __v: number;
  };

export default async function updateStripeUserAccount(
  user: UserDocument,
  stripe_price_id: string
) {
  if (user.stripe_subscription && user.stripe_customer_id) {
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: process.env.STRIPE_UPDATE_CANCEL_URL,
    });

    return { url: session.url };
  } else {
    // If the user doesn’t have a Stripe subscription or customer ID, it means they are not a Stripe customer
    const customer = await stripe.customers.create({
      name: user.name,
      email: user.email,
    });

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [
        {
          price: stripe_price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      payment_method_types: ['card'],
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return { url: stripeCheckoutSession.url, stripeCustomerId: customer.id };
  }
}
