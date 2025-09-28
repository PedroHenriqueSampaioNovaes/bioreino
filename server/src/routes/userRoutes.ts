import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';

import { CreateUserController } from '../controllers/user/CreateUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';
import { UpdateLastWatchedController } from '../controllers/user/UpdateLastWatchedController';
import { ForgotPasswordController } from '../controllers/user/ForgotPasswordController';
import { ResetPasswordController } from '../controllers/user/ResetPasswordController';
import { CreateTemporaryAccountController } from '../controllers/user/CreateTemporaryAccountController';
import { DetailUserController } from '../controllers/user/DetailUserController';
import { UpdateUserController } from '../controllers/user/UpdateUserController';

const router = Router();

router.post('/', CreateUserController.handle);
router.post('/session', LoginUserController.handle);
router.post('/forgot_password', ForgotPasswordController.handle);
router.post('/temporary', CreateTemporaryAccountController.handle);

router.get('/me', isAuthenticated, DetailUserController.handle);

router.patch('/', isAuthenticated, UpdateUserController.handle);
router.patch(
  '/last_course',
  isAuthenticated,
  UpdateLastWatchedController.handle
);
router.patch('/reset_password', ResetPasswordController.handle);

export default { router, baseRoute: '/user' };
