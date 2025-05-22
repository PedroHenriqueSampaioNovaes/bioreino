import { NextFunction, Request, Response } from 'express';

import { ListCourseService } from '../../services/course/ListCourseService';

export class ListCourseController {
  static async handle(
    req: Request<
      any,
      any,
      any,
      { limit?: string; free?: string; planId?: string }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { limit, free, planId } = req.query;

      const courses = await ListCourseService.execute({
        limit: limit ? Number(limit) : undefined,
        free: free === 'true' ? true : free === 'false' ? false : undefined,
        planId,
      });

      res.json(courses);
    } catch (error) {
      next(error);
    }
  }
}
