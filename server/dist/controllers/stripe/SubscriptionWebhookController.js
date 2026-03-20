import { stripe } from '../../config/stripe.js';
import { ApiError } from '../../utils/ApiError.js';
import manageSubscription from '../../modules/stripe/manageSubscription.js';
export class SubscriptionWebhookController {
    static async handle(req, res, next) {
        try {
            let event;
            try {
                event = stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
            }
            catch (err) {
                console.error(`⚠️  Webhook signature verification failed.`);
                res.sendStatus(400);
                return;
            }
            const data = event.data;
            const eventType = event.type;
            switch (eventType) {
                case 'checkout.session.completed':
                    const checkoutSession = data.object;
                    if (!checkoutSession.customer || !checkoutSession.subscription) {
                        throw new ApiError('Não foi possível obter o ID do customer ou sua assinatura');
                    }
                    await manageSubscription(checkoutSession.customer.toString(), checkoutSession.subscription.toString(), 'create');
                    break;
                case 'customer.subscription.updated':
                    const subscriptionUpdated = data.object;
                    await manageSubscription(subscriptionUpdated.customer.toString(), subscriptionUpdated.id.toString());
                    break;
                case 'customer.subscription.deleted':
                    const subscriptionDeleted = data.object;
                    await manageSubscription(subscriptionDeleted.customer.toString(), subscriptionDeleted.id.toString(), 'delete');
                    break;
            }
            res.sendStatus(200);
        }
        catch (error) {
            next(error);
        }
    }
}
