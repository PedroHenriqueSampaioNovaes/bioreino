import { Router } from 'express';

import { ListSubscriptionController } from '../controllers/subscription/ListSubscriptionController.js';

const router = Router();

router.get('/', ListSubscriptionController.handle);

export default { router, baseRoute: '/subscriptions' };
