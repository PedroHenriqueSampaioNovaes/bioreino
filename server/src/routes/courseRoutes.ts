import { Router } from 'express';

import { ListCourseController } from '../controllers/course/ListCourseController.js';
import { GetCourseBySlugController } from '../controllers/course/GetCourseBySlugController.js';

const router = Router();

router.get('/', ListCourseController.handle);
router.get('/slug/:slug', GetCourseBySlugController.handle);

export default { router, baseRoute: '/courses' };
