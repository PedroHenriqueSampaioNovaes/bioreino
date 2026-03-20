import { Router } from 'express';
import { ListCourseController } from '../controllers/course/ListCourseController.js';
import { GetCourseController } from '../controllers/course/GetCourseController.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
const router = Router();
router.get('/', ListCourseController.handle);
router.get('/slug/:slug', isAuthenticated, GetCourseController.handle);
export default { router, baseRoute: '/courses' };
