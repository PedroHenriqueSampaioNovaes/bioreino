import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated.js';

import { UpdateCourseProgressController } from '../controllers/courseProgress/UpdateCourseProgressController.js';
import { GetCourseProgressController } from '../controllers/courseProgress/GetCourseProgressController.js';

const router = Router();

router.get('/', isAuthenticated, GetCourseProgressController.handle);

router.patch(
  '/:course_id',
  isAuthenticated,
  UpdateCourseProgressController.handle
);

export default { router, baseRoute: '/course_progress' };
