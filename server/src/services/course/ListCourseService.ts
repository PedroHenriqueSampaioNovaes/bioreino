import { FilterQuery, Types } from 'mongoose';

import { Course, ICourse } from '../../models/CourseModel.js';
import { Plan } from '../../models/PlanModel.js';

import { ApiError } from '../../utils/ApiError.js';

interface ICourseRequest {
  limit?: number;
  hasLessonFree?: boolean;
  planId?: string;
}

export class ListCourseService {
  static async execute({ limit, hasLessonFree, planId }: ICourseRequest) {
    const query = {} as FilterQuery<ICourse>;

    if (hasLessonFree) query['hasLessonFree'] = hasLessonFree;

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
