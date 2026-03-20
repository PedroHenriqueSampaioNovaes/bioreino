import { NextFunction, Request, Response } from 'express';

import { z } from 'zod';

import { UpdateLastWatchedService } from '../../services/user/UpdateLastWatchedService.js';

export class UpdateLastWatchedController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const { user_id } = req;
      const bodyScheme = z.object({
        courseId: z.string({ required_error: 'O _id do curso é obrigatório.' }),
        lessonId: z.string({ required_error: 'O _id da aula é obrigatório.' }),
      });

      const bodyData = bodyScheme.parse(req.body);

      const updatedUser = await UpdateLastWatchedService.execute({
        ...bodyData,
        user_id,
      });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
}
