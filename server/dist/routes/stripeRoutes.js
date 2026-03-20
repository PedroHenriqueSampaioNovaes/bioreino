import express, { Router } from 'express';
import { SubscriptionWebhookController } from '../controllers/stripe/SubscriptionWebhookController.js';
const router = Router();
router.post('/webhook', express.raw({ type: 'application/json' }), SubscriptionWebhookController.handle);
export default { router, baseRoute: '/stripe' };
