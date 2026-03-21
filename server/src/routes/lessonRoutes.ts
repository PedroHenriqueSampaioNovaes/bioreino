import { Router } from 'express';

import { ListLessonController } from '../controllers/lesson/ListLessonController.js';

const router = Router();

router.get('/', ListLessonController.handle);

export default { router, baseRoute: '/lessons' };
