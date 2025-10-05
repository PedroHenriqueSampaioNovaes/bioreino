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
exports.UpdateUserService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const stripe_1 = require("../../config/stripe");
const UserModel_1 = require("../../models/UserModel");
const PlanModel_1 = require("../../models/PlanModel");
const updateStripeUserAccount_1 = __importDefault(require("../../modules/stripe/updateStripeUserAccount"));
class UpdateUserService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ subscriptionId, payment_method, user_id, }) {
            const userData = yield UserModel_1.User.findById(user_id);
            if (!userData) {
                throw new ApiError_1.ApiError('Não foi possível encontrar o usuário.');
            }
            const subscription = yield PlanModel_1.Plan.findById(subscriptionId);
            if (!subscription) {
                throw new ApiError_1.ApiError('Não foi possível encontrar este plano de assinatura.');
            }
            if (userData.plan._id.toString() === subscription._id.toString()) {
                throw new ApiError_1.ApiError('Este usuário já possui o plano de assinatura selecionado.');
            }
            // CANCEL SUBSCRIPTION ON STRIPE IF THE USER CHANGED THEIR PAYMENT METHOD FROM STRIPE TO ANOTHER
            if (payment_method !== 'stripe' && userData.stripe_subscription) {
                yield stripe_1.stripe.subscriptions.cancel(userData.stripe_subscription.id);
            }
            let stripeURL = null;
            let customerId = userData.stripe_customer_id;
            if (payment_method === 'stripe') {
                // CREATE OR UPDATE CUSTOMER ON STRIPE
                const { url, stripeCustomerId } = yield (0, updateStripeUserAccount_1.default)(userData, subscription.stripe_price_id);
                stripeURL = url;
                customerId = stripeCustomerId !== null && stripeCustomerId !== void 0 ? stripeCustomerId : customerId;
            }
            else {
                userData.plan = subscription._id;
            }
            userData.payment_method = payment_method;
            userData.stripe_customer_id = customerId;
            const updatedUser = yield UserModel_1.User.findByIdAndUpdate(user_id, userData, {
                new: true,
            })
                .select('+name email plan status payment_method')
                .populate('plan', '-benefits -price -stripe_price_id');
            return { updatedUser, stripeURL };
        });
    }
}
exports.UpdateUserService = UpdateUserService;
