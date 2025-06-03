import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';

import { UpdateCourseProgressController } from '../controllers/courseProgress/UpdateCourseProgressController';
import { GetCourseProgressController } from '../controllers/courseProgress/GetCourseProgressController';

const router = Router();

router.get('/', isAuthenticated, GetCourseProgressController.handle);

router.patch(
  '/:course_id',
  isAuthenticated,
  UpdateCourseProgressController.handle
);

export default router.use('/course_progress', router);
