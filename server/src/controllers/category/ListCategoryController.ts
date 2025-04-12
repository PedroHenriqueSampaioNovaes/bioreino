import { NextFunction, Request, Response } from 'express';

import { ListCategoryService } from '../../services/category/ListCategoryService';

export class ListCategoryController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await ListCategoryService.execute();

      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
}
