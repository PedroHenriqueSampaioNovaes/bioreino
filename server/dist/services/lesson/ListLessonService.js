import { Types } from 'mongoose';
import { Course } from '../../models/CourseModel.js';
import { Lesson } from '../../models/LessonModel.js';
import { ApiError } from '../../utils/ApiError.js';
export class ListLessonService {
    static async execute({ courseId }) {
        if (courseId) {
            if (!Types.ObjectId.isValid(courseId)) {
                throw new ApiError('ID do curso inválido.', 400);
            }
            const course = await Course.findById(courseId);
            if (!course) {
                throw new ApiError('Curso não encontrado.', 404);
            }
            const lessons = await Lesson.find({
                courseId: new Types.ObjectId(courseId),
            });
            return lessons;
        }
        const lessons = await Lesson.find();
        return lessons;
    }
}
