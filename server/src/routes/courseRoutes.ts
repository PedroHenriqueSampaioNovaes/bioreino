import { Router } from 'express';

import { ListCourseController } from '../controllers/course/ListCourseController.js';
import { GetCourseBySlugController } from '../controllers/course/GetCourseBySlugController.js';
import { verifyAuthentication } from '../middlewares/verifyAuthentication.js';

const router = Router();

router.get('/', ListCourseController.handle);
router.get(
  '/slug/:slug',
  verifyAuthentication,
  GetCourseBySlugController.handle,
);

export default { router, baseRoute: '/courses' };
