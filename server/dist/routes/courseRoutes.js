import { Router } from 'express';
import { ListCourseController } from '../controllers/course/ListCourseController.js';
import { GetCourseController } from '../controllers/course/GetCourseController.js';
import { verifyAuthentication } from '../middlewares/verifyAuthentication.js';
const router = Router();
router.get('/', ListCourseController.handle);
router.get('/slug/:slug', verifyAuthentication, GetCourseController.handle);
export default { router, baseRoute: '/courses' };
