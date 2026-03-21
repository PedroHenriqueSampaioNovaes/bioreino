import { NextFunction, Request, Response } from 'express';

import { ListCourseService } from '../../services/course/ListCourseService.js';

export class ListCourseController {
  static async handle(
    req: Request<
      any,
      any,
      any,
      { limit?: string; hasLessonFree?: string; plan_id?: string }
    >,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { limit, hasLessonFree, plan_id } = req.query;

      const courses = await ListCourseService.execute({
        limit: limit ? Number(limit) : undefined,
        hasLessonFree: hasLessonFree === 'true',
        planId: plan_id,
      });

      res.json(courses);
    } catch (error) {
      next(error);
    }
  }
}
