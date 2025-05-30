import { Router } from 'express';

import { ListSubscriptionController } from '../controllers/subscription/ListSubscriptionController';

const router = Router();

router.get('/', ListSubscriptionController.handle);

export default router.use('/subscriptions', router);
