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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionWebhookController = void 0;
const stripe_1 = require("../../config/stripe");
const ApiError_1 = require("../../utils/ApiError");
const manageSubscription_1 = __importDefault(require("../../modules/stripe/manageSubscription"));
class SubscriptionWebhookController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let event;
                try {
                    event = stripe_1.stripe.webhooks.constructEvent(req.body, req.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET);
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
                            throw new ApiError_1.ApiError('Não foi possível obter o ID do customer ou sua assinatura');
                        }
                        yield (0, manageSubscription_1.default)(checkoutSession.customer.toString(), checkoutSession.subscription.toString(), 'create');
                        break;
                    case 'customer.subscription.updated':
                        const subscriptionUpdated = data.object;
                        yield (0, manageSubscription_1.default)(subscriptionUpdated.customer.toString(), subscriptionUpdated.id.toString());
                        break;
                    case 'customer.subscription.deleted':
                        const subscriptionDeleted = data.object;
                        yield (0, manageSubscription_1.default)(subscriptionDeleted.customer.toString(), subscriptionDeleted.id.toString(), 'delete');
                        break;
                }
                res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.SubscriptionWebhookController = SubscriptionWebhookController;
