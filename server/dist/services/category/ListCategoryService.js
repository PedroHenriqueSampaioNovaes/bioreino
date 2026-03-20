import { Types } from 'mongoose';
import { Category } from '../../models/CategoryModel.js';
import { Plan } from '../../models/PlanModel.js';
import { ApiError } from '../../utils/ApiError.js';
export class ListCategoryService {
    static async execute({ planId }) {
        const query = {};
        if (planId && Types.ObjectId.isValid(planId)) {
            const plan = await Plan.findById(planId);
            if (!plan)
                throw new ApiError('Nenhum plano de assinatura foi encontrado.');
            if (!plan.fullaccess) {
                query['$or'] = [
                    { plan: null },
                    { plan: new Types.ObjectId(plan.id) },
                ];
            }
        }
        const categories = await Category.find(query);
        return categories;
    }
}
