import { stripe } from '../../config/stripe.js';
import { User } from '../../models/UserModel.js';
import { Plan } from '../../models/PlanModel.js';
export default async function manageSubscription(customerId, subscriptionId, action = null) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subscriptionModel = await Plan.findOne({
        stripe_price_id: subscription.items.data[0].price.id,
    });
    if (action === 'create') {
        try {
            await User.findOneAndUpdate({ stripe_customer_id: customerId }, {
                $set: {
                    plan: subscriptionModel?._id,
                    status: subscription.status,
                    stripe_subscription: {
                        id: subscription.id,
                        price_id: subscription.items.data[0].price.id,
                    },
                },
            });
        }
        catch (error) {
            console.error('Não foi possível criar a subscription', error);
        }
    }
    else if (action === 'delete') {
        await User.findOneAndUpdate({ stripe_customer_id: customerId }, {
            $set: {
                status: subscription.status,
                stripe_subscription: null,
            },
        });
    }
    else {
        try {
            await User.findOneAndUpdate({ stripe_customer_id: customerId }, {
                $set: {
                    plan: subscriptionModel?._id,
                    status: subscription.status,
                    stripe_subscription: {
                        id: subscription.id,
                        price_id: subscription.items.data[0].price.id,
                    },
                },
            });
        }
        catch (error) {
            console.error('Não foi possível atualizar a subscription', error);
        }
    }
}
