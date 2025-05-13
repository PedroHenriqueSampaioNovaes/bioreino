import { Request, Response } from 'express';

import { DetailUserService } from '../../services/user/DetailUserService';

export class DetailUserController {
  static async handle(req: Request, res: Response) {
    const { user_id } = req;
    const user = await DetailUserService.execute(user_id);

    res.json(user);
  }
}
