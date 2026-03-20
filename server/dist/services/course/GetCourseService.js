import { Course } from '../../models/CourseModel.js';
import { ApiError } from '../../utils/ApiError.js';
export class GetCourseService {
    static async execute({ slug }) {
        const course = await Course.findOne({ slug }).populate('lessons');
        if (!course) {
            throw new ApiError('Curso não encontrado!', 404);
        }
        return course;
    }
}
