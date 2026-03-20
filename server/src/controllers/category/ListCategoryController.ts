import { NextFunction, Request, Response } from 'express';

import { ListCategoryService } from '../../services/category/ListCategoryService.js';

export class ListCategoryController {
  static async handle(
    req: Request<any, any, any, { plan_id?: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { plan_id } = req.query;

      const categories = await ListCategoryService.execute({ planId: plan_id });

      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}
