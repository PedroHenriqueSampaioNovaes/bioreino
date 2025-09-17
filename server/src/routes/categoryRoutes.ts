import { Router } from 'express';

import { ListCategoryController } from '../controllers/category/ListCategoryController';

const router = Router();

router.get('/', ListCategoryController.handle);

export default { router, baseRoute: '/categories' };
