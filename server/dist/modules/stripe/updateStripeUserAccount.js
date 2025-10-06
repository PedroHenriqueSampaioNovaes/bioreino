"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = updateStripeUserAccount;
const stripe_1 = require("../../config/stripe");
function updateStripeUserAccount(user, stripe_price_id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (user.stripe_customer_id) {
            const session = yield stripe_1.stripe.billingPortal.sessions.create({
                customer: user.stripe_customer_id,
                return_url: process.env.STRIPE_UPDATE_CANCEL_URL,
            });
            return { url: session.url };
        }
        else {
            // If the user doesn’t have a Stripe subscription or customer ID, it means they are not a Stripe customer
            const customer = yield stripe_1.stripe.customers.create({
                name: user.name,
                email: user.email,
            });
            const stripeCheckoutSession = yield stripe_1.stripe.checkout.sessions.create({
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
    });
}
