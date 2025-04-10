import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';

import { CreateUserController } from '../controllers/user/CreateUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';
import { UpdateLastWatchedController } from '../controllers/user/UpdateLastWatchedController';

const router = Router();

router.post('/', CreateUserController.handle);
router.post('/session', LoginUserController.handle);

router.patch(
  '/last_course',
  isAuthenticated,
  UpdateLastWatchedController.handle
);

export default router.use('/users', router);
