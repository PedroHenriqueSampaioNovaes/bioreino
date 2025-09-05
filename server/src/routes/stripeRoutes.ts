import express, { Router } from 'express';

import { SubscriptionWebhookController } from '../controllers/stripe/SubscriptionWebhookController';

const router = Router();

router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  SubscriptionWebhookController.handle
);

export default router.use('/stripe', router);
