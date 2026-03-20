import { Types } from 'mongoose';
import { Course } from '../../models/CourseModel.js';
import { Plan } from '../../models/PlanModel.js';
import { ApiError } from '../../utils/ApiError.js';
export class ListCourseService {
    static async execute({ limit, free, planId }) {
        const query = {};
        if (free !== undefined)
            query['free'] = free;
        if (planId && Types.ObjectId.isValid(planId)) {
            const plan = await Plan.findById(planId);
            if (!plan)
                throw new ApiError('Nenhum plano de assinatura foi encontrado.');
            if (!plan.fullaccess)
                query['plan'] = new Types.ObjectId(plan.id);
        }
        const courses = await Course.find(query)
            .limit(limit ?? 0)
            .populate('plan', '-benefits -price');
        return courses;
    }
}
