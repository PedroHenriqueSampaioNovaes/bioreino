import { NextFunction, Request, Response } from 'express';

import { ListLessonService } from '../../services/lesson/ListLessonService.js';

export class ListLessonController {
  static async handle(
    req: Request<any, any, any, { course_id?: string }>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { course_id } = req.query;

      const lessons = await ListLessonService.execute({ courseId: course_id });

      res.json(lessons);
    } catch (error) {
      next(error);
    }
  }
}
