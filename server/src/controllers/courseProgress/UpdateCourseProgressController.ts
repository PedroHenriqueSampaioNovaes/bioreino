import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

import { UpdateCourseProgressService } from '../../services/courseProgress/UpdateCourseProgressService';

export class UpdateCourseProgressController {
  static async handle(
    req: Request<{ courseId: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user_id } = req;
      const bodyScheme = z.object({
        courseId: z.string({ required_error: 'O _id do curso é obrigatório.' }),
        lessonId: z.string({ required_error: 'O _id da aula é obrigatório.' }),
      });

      const bodyData = bodyScheme.parse({
        ...req.body,
        courseId: req.params.courseId,
      });

      await UpdateCourseProgressService.execute({
        ...bodyData,
        user_id,
      });

      res.end();
    } catch (error) {
      next(error);
    }
  }
}
