import { Router } from 'express';

import { ListCourseController } from '../controllers/course/ListCourseController';

const router = Router();

router.get('/', ListCourseController.handle);

export default router.use('/courses', router);
