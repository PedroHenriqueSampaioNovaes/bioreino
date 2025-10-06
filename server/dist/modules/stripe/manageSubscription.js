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
exports.default = manageSubscription;
const stripe_1 = require("../../config/stripe");
const UserModel_1 = require("../../models/UserModel");
const PlanModel_1 = require("../../models/PlanModel");
function manageSubscription(customerId_1, subscriptionId_1) {
    return __awaiter(this, arguments, void 0, function* (customerId, subscriptionId, action = null) {
        const subscription = yield stripe_1.stripe.subscriptions.retrieve(subscriptionId);
        const subscriptionModel = yield PlanModel_1.Plan.findOne({
            stripe_price_id: subscription.items.data[0].price.id,
        });
        if (action === 'create') {
            try {
                yield UserModel_1.User.findOneAndUpdate({ stripe_customer_id: customerId }, {
                    $set: {
                        plan: subscriptionModel === null || subscriptionModel === void 0 ? void 0 : subscriptionModel._id,
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
            yield UserModel_1.User.findOneAndUpdate({ stripe_customer_id: customerId }, {
                $set: {
                    status: subscription.status,
                    stripe_subscription: null,
                },
            });
        }
        else {
            try {
                yield UserModel_1.User.findOneAndUpdate({ stripe_customer_id: customerId }, {
                    $set: {
                        plan: subscriptionModel === null || subscriptionModel === void 0 ? void 0 : subscriptionModel._id,
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
    });
}
