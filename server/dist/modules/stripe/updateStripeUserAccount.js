import { stripe } from '../../config/stripe.js';
export default async function updateStripeUserAccount(user, stripe_price_id) {
    if (user.stripe_customer_id) {
        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripe_customer_id,
            return_url: process.env.STRIPE_UPDATE_CANCEL_URL,
        });
        return { url: session.url };
    }
    else {
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
