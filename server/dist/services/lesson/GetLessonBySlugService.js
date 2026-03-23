import { Lesson } from '../../models/LessonModel.js';
import { ApiError } from '../../utils/ApiError.js';
export class GetLessonBySlugService {
    static async execute({ slug }) {
        const lesson = await Lesson.findOne({ slug });
        if (!lesson) {
            throw new ApiError('Aula não encontrada!', 404);
        }
        return lesson;
    }
}
