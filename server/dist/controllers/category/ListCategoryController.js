import { ListCategoryService } from '../../services/category/ListCategoryService.js';
export class ListCategoryController {
    static async handle(req, res, next) {
        try {
            const { plan_id } = req.query;
            const categories = await ListCategoryService.execute({ planId: plan_id });
            res.json(categories);
        }
        catch (error) {
            next(error);
        }
    }
}
