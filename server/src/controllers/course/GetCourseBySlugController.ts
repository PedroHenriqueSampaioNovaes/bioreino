import { NextFunction, Request, Response } from 'express';

import { GetCourseBySlugService } from '../../services/course/GetCourseBySlugService.js';

export class GetCourseBySlugController {
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

      const course = await GetCourseBySlugService.execute({ slug });

      res.json(course);
    } catch (error) {
      next(error);
    }
  }
}
