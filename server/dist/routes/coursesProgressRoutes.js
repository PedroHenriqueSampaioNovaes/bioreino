import { Router } from 'express';
import { verifyAuthentication } from '../middlewares/verifyAuthentication.js';
import { UpdateCourseProgressController } from '../controllers/courseProgress/UpdateCourseProgressController.js';
import { GetCourseProgressController } from '../controllers/courseProgress/GetCourseProgressController.js';
const router = Router();
router.get('/', verifyAuthentication, GetCourseProgressController.handle);
router.patch('/:course_id', verifyAuthentication, UpdateCourseProgressController.handle);
export default { router, baseRoute: '/course_progress' };
