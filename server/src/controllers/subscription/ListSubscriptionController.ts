import { NextFunction, Request, Response } from 'express';

import { ListSubscriptionService } from '../../services/subscription/ListSubscriptionService';

export class ListSubscriptionController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const subscriptions = await ListSubscriptionService.execute();

      res.json(subscriptions);
    } catch (error) {
      next(error);
    }
  }
}
