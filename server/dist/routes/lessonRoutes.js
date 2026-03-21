import { Router } from 'express';
import { ListLessonController } from '../controllers/lesson/ListLessonController.js';
import { GetVideoInfoController } from '../controllers/lesson/GetVideoInfoController.js';
const router = Router();
router.get('/', ListLessonController.handle);
router.get('/:lesson/video', GetVideoInfoController.handle);
export default { router, baseRoute: '/lessons' };
