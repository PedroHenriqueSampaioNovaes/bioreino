import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';

const router = Router();

router.post('/', CreateUserController.handle);

export default router.use('/users', router);
