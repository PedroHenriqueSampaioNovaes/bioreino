import { Router } from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated';

import { UpdateCourseProgressController } from '../controllers/courseProgress/UpdateCourseProgressController';

const router = Router();

router.patch(
  '/:courseId',
  isAuthenticated,
  UpdateCourseProgressController.handle
);

export default router.use('/course_progress', router);
