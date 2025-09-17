import { Router } from 'express';

import { ListCourseController } from '../controllers/course/ListCourseController';
import { GetCourseController } from '../controllers/course/GetCourseController';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

router.get('/', ListCourseController.handle);
router.get('/slug/:slug', isAuthenticated, GetCourseController.handle);

export default { router, baseRoute: '/courses' };
