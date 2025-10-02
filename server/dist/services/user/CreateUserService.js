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
exports.CreateUserService = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const stripe_1 = require("../../config/stripe");
const ApiError_1 = require("../../utils/ApiError");
const UserModel_1 = require("../../models/UserModel");
const PlanModel_1 = require("../../models/PlanModel");
class CreateUserService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, name, password, subscriptionId, payment_method, address, }) {
            const salt = (0, bcryptjs_1.genSaltSync)();
            const passwordHash = (0, bcryptjs_1.hashSync)(password, salt);
            const userAlreadyExists = yield UserModel_1.User.findOne({ email });
            if (userAlreadyExists) {
                throw new ApiError_1.ApiError('E-mail já existe', 409);
            }
            if (!(0, mongoose_1.isValidObjectId)(subscriptionId)) {
                throw new ApiError_1.ApiError('Houve um erro ao validar o id do plano de assinatura');
            }
            const plan = yield PlanModel_1.Plan.findById(subscriptionId);
            if (!plan) {
                throw new ApiError_1.ApiError('Plano de assinatura não encontrado');
            }
            let activeAccount = null;
            let checkoutURL = null;
            let customer = null;
            if (payment_method !== 'stripe') {
                activeAccount = 'active';
            }
            else {
                customer = yield stripe_1.stripe.customers.create({
                    name,
                    email,
                    address: {
                        state: address.state,
                        country: 'BR',
                        line1: address.street,
                        postal_code: address.cep,
                    },
                });
                const stripeCheckoutSession = yield stripe_1.stripe.checkout.sessions.create({
                    customer: customer.id,
                    line_items: [
                        {
                            price: plan.stripe_price_id,
                            quantity: 1,
                        },
                    ],
                    mode: 'subscription',
                    allow_promotion_codes: true,
                    payment_method_types: ['card'],
                    success_url: process.env.STRIPE_SUCCESS_URL,
                    cancel_url: process.env.STRIPE_CANCEL_URL,
                });
                activeAccount = stripeCheckoutSession.status;
                checkoutURL = stripeCheckoutSession.url;
            }
            const user = new UserModel_1.User({
                email,
                password: passwordHash,
                name,
                plan: plan._id,
                payment_method,
                status: activeAccount,
                stripe_customer_id: (customer === null || customer === void 0 ? void 0 : customer.id) || null,
            });
            yield user.save();
            return {
                _id: user._id,
                email: user.email,
                password: user.password,
                checkoutURL,
            };
        });
    }
}
exports.CreateUserService = CreateUserService;
