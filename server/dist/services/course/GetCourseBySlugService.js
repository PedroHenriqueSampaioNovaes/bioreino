import { Course } from '../../models/CourseModel.js';
import { ApiError } from '../../utils/ApiError.js';
export class GetCourseBySlugService {
    static async execute({ slug, isUserAuthenticated }) {
        const course = await Course.findOne({ slug }).populate('lessons');
        if (!course) {
            throw new ApiError('Curso não encontrado!', 404);
        }
        if (!course.hasLessonFree && !isUserAuthenticated) {
            throw new ApiError('Acesso negado.', 401);
        }
        return course;
    }
}
