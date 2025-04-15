import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';

import { CreateUserController } from '../controllers/user/CreateUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';
import { UpdateLastWatchedController } from '../controllers/user/UpdateLastWatchedController';
import { ForgotPasswordController } from '../controllers/user/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/user/ResetPasswordController';

const router = Router();

router.post('/', CreateUserController.handle);
router.post('/session', LoginUserController.handle);
router.post('/forgot_password', ForgotPasswordController.handle);

router.patch(
  '/last_course',
  isAuthenticated,
  UpdateLastWatchedController.handle
);
router.patch('/reset_password', ResetPasswordController.handle);

export default router.use('/user', router);
