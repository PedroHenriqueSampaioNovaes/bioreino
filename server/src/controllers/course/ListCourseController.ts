import { NextFunction, Request, Response } from 'express';

import { ListCourseService } from '../../services/course/ListCourseService.js';

export class ListCourseController {
  static async handle(
    req: Request<
      any,
      any,
      any,
      { limit?: string; free?: string; plan_id?: string }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { limit, free, plan_id } = req.query;

      const courses = await ListCourseService.execute({
        limit: limit ? Number(limit) : undefined,
        free: free === 'true' ? true : free === 'false' ? false : undefined,
        planId: plan_id,
      });

      res.json(courses);
    } catch (error) {
      next(error);
    }
  }
}
