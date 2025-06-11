import { FilterQuery, Types } from 'mongoose';

import { Course, ICourse } from '../../models/CourseModel';
import { Plan } from '../../models/PlanModel';

import { ApiError } from '../../utils/ApiError';

interface ICourseRequest {
  limit?: number;
  free?: boolean;
  planId?: string;
}

export class ListCourseService {
  static async execute({ limit, free, planId }: ICourseRequest) {
    const query = {} as FilterQuery<ICourse>;

    if (free !== undefined) query['free'] = free;

    if (planId && Types.ObjectId.isValid(planId)) {
      const plan = await Plan.findById(planId);

      if (!plan)
        throw new ApiError('Nenhum plano de assinatura foi encontrado.');

      if (!plan.fullaccess)
        query['plan'] = new Types.ObjectId(plan.id as string);
    }

    const courses = await Course.find(query)
      .limit(limit ?? 0)
      .populate('plan', '-benefits -price');

    return courses;
  }
}
