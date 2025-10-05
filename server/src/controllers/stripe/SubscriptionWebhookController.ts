import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';

import { stripe } from '../../config/stripe';

import { ApiError } from '../../utils/ApiError';

import manageSubscription from '../../modules/stripe/manageSubscription';

export class SubscriptionWebhookController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          req.headers['stripe-signature'] as string,
          process.env.STRIPE_WEBHOOK_SECRET as string
        );
      } catch (err) {
        console.error(`⚠️  Webhook signature verification failed.`);
        res.sendStatus(400);
        return;
      }

      const data = event.data;
      const eventType = event.type;

      switch (eventType) {
        case 'checkout.session.completed':
          const checkoutSession = data.object as Stripe.Checkout.Session;

          if (!checkoutSession.customer || !checkoutSession.subscription) {
            throw new ApiError(
              'Não foi possível obter o ID do customer ou sua assinatura'
            );
          }

          await manageSubscription(
            checkoutSession.customer.toString(),
            checkoutSession.subscription.toString(),
            'create'
          );
          break;

        case 'customer.subscription.updated':
          const subscriptionUpdated = data.object as Stripe.Subscription;

          await manageSubscription(
            subscriptionUpdated.customer.toString(),
            subscriptionUpdated.id.toString()
          );
          break;

        case 'customer.subscription.deleted':
          const subscriptionDeleted = data.object as Stripe.Subscription;

          await manageSubscription(
            subscriptionDeleted.customer.toString(),
            subscriptionDeleted.id.toString(),
            'delete'
          );
          break;
      }

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
