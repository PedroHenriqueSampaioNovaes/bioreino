import { isValidObjectId } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { stripe } from '../../config/stripe.js';
import { ApiError } from '../../utils/ApiError.js';
import { User } from '../../models/UserModel.js';
import { Plan } from '../../models/PlanModel.js';
export class CreateUserService {
    static async execute({ email, name, password, subscriptionId, payment_method, address, }) {
        const salt = genSaltSync();
        const passwordHash = hashSync(password, salt);
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            throw new ApiError('E-mail já existe', 409);
        }
        if (!isValidObjectId(subscriptionId)) {
            throw new ApiError('Houve um erro ao validar o id do plano de assinatura');
        }
        const plan = await Plan.findById(subscriptionId);
        if (!plan) {
            throw new ApiError('Plano de assinatura não encontrado');
        }
        let activeAccount = null;
        let checkoutURL = null;
        let customer = null;
        if (payment_method !== 'stripe') {
            activeAccount = 'active';
        }
        else {
            customer = await stripe.customers.create({
                name,
                email,
                address: {
                    state: address.state,
                    country: 'BR',
                    line1: address.street,
                    postal_code: address.cep,
                },
            });
            const stripeCheckoutSession = await stripe.checkout.sessions.create({
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
        const user = new User({
            email,
            password: passwordHash,
            name,
            plan: plan._id,
            payment_method,
            status: activeAccount,
            stripe_customer_id: customer?.id || null,
        });
        await user.save();
        return {
            _id: user._id,
            email: user.email,
            password: user.password,
            checkoutURL,
        };
    }
}
