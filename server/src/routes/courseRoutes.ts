import { Router } from 'express';

import { ListCourseController } from '../controllers/course/ListCourseController';

const router = Router();

router.get('/all', ListCourseController.handle);

export default router.use('/course', router);
