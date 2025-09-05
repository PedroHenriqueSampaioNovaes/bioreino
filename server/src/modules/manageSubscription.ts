import { stripe } from '../config/stripe';

import { User } from '../models/UserModel';

type Action = 'create' | 'delete' | null;

export default async function manageSubscription(
  customerId: string,
  subscriptionId: string,
  action: Action = null
) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  if (action === 'create') {
    try {
      await User.findOneAndUpdate(
        { stripe_customer_id: customerId },
        {
          $set: {
            status: subscription.status,
            stripe_subscription: {
              id: subscription.id,
              priceId: subscription.items.data[0].price.id,
            },
          },
        }
      );
    } catch (error) {
      console.error('Não foi possível criar a subscription', error);
    }
  } else if (action === 'delete') {
    await User.findOneAndUpdate(
      { stripe_customer_id: customerId },
      {
        $set: {
          status: subscription.status,
          stripe_subscription: null,
        },
      }
    );
  } else {
    try {
      await User.findOneAndUpdate(
        { stripe_customer_id: customerId },
        {
          $set: {
            status: subscription,
            stripe_subscription: {
              priceId: subscription.items.data[0].price.id,
            },
          },
        }
      );
    } catch (error) {
      console.error('Não foi possível atualizar a subscription', error);
    }
  }
}
