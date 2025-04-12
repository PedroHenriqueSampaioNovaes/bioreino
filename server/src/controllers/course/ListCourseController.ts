import { NextFunction, Request, Response } from 'express';

import { ListCourseService } from '../../services/course/ListCourseService';

export class ListCourseController {
  static async handle(
    req: Request<any, any, any, { limit?: string; free?: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { limit, free } = req.query;

      const courses = await ListCourseService.execute({
        limit: limit ? Number(limit) : undefined,
        free: Boolean(free),
      });

      res.json(courses);
    } catch (error) {
      next(error);
    }
  }
}
