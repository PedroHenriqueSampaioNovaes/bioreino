import { Router } from 'express';

import { CreateUserController } from '../controllers/user/CreateUserController';
import { LoginUserController } from '../controllers/user/LoginUserController';

const router = Router();

router.post('/', CreateUserController.handle);
router.post('/session', LoginUserController.handle);

export default router.use('/users', router);
