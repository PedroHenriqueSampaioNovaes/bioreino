import { isValidObjectId } from 'mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';

import { stripe } from '../../config/stripe';

import { ApiError } from '../../utils/ApiError';

import { IAddress } from '../../@types/user/address';
import { ICard } from '../../@types/user/payment';

import { User } from '../../models/UserModel';
import { Plan } from '../../models/PlanModel';

type PaymentMethod = 'pix' | 'stripe' | 'bank_slip' | 'credit_card';

interface IUserRequest {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
  subscriptionId: string;
  payment_method: PaymentMethod;
  address: IAddress;
  card: ICard;
}

export class CreateUserService {
  static async execute({
    email,
    name,
    password,
    subscriptionId,
    payment_method,
    address,
  }: //  CARD N SERÁ USADO, POIS ESTE PROJETO É PARA FINS ESTUDANTIS
  IUserRequest) {
    const salt = genSaltSync();
    const passwordHash = hashSync(password, salt);

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new ApiError('E-mail/Senha incorreto', 409);
    }

    if (!isValidObjectId(subscriptionId)) {
      throw new ApiError(
        'Houve um erro ao validar o id do plano de assinatura'
      );
    }

    const plan = await Plan.findById(subscriptionId);
    if (!plan) {
      throw new ApiError('Plano de assinatura não encontrado');
    }

    let activeAccount = null;
    let checkoutURL = null;
    let customer = null;

    if (
      payment_method === 'pix' ||
      payment_method === 'bank_slip' ||
      payment_method === 'credit_card'
    ) {
      activeAccount = 'active';
    } else if (payment_method === 'stripe') {
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
        billing_address_collection: 'required',
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
