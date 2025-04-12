import { Router } from 'express';

import { ListCategoryController } from '../controllers/category/ListCategoryController';

const router = Router();

router.get('/all', ListCategoryController.handle);

export default router.use('/category', router);
