import { NextFunction, Request, Response } from 'express';

import { GetCourseProgressService } from '../../services/courseProgress/GetCourseProgressService.js';

export class GetCourseProgressController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req;

      const progress = await GetCourseProgressService.execute({
        user_id,
      });

      res.json(progress);
    } catch (error) {
      next(error);
    }
  }
}
