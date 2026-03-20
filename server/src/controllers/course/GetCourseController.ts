import { NextFunction, Request, Response } from 'express';

import { GetCourseService } from '../../services/course/GetCourseService.js';

export class GetCourseController {
  static async handle(
    req: Request<{ slug: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { slug } = req.params;

      if (!slug) {
        res.status(400).json({ error: 'Slug do curso é obrigatório' });
        return;
      }

      const course = await GetCourseService.execute({ slug });

      res.json(course);
    } catch (error) {
      next(error);
    }
  }
}
