import { FilterQuery, Types } from 'mongoose';

import { Category, ICategory } from '../../models/CategoryModel.js';
import { Plan } from '../../models/PlanModel.js';

import { ApiError } from '../../utils/ApiError.js';

interface ICourseRequest {
  planId?: string;
}

export class ListCategoryService {
  static async execute({ planId }: ICourseRequest) {
    const query = {} as FilterQuery<ICategory>;

    if (planId && Types.ObjectId.isValid(planId)) {
      const plan = await Plan.findById(planId);

      if (!plan)
        throw new ApiError('Nenhum plano de assinatura foi encontrado.');

      if (!plan.fullaccess) {
        query['$or'] = [
          { plan: null },
          { plan: new Types.ObjectId(plan.id as string) },
        ];
      }
    }

    const categories = await Category.find(query);

    return categories;
  }
}
