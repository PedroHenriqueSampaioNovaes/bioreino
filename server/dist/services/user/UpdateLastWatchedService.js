import { ApiError } from '../../utils/ApiError.js';
import { User } from '../../models/UserModel.js';
import { Course } from '../../models/CourseModel.js';
import { Lesson } from '../../models/LessonModel.js';
export class UpdateLastWatchedService {
    static async execute({ user_id, courseId, lessonId }) {
        const course = await Course.findById(courseId);
        if (!course) {
            throw new ApiError('Não foi possível encontrar o curso.');
        }
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            throw new ApiError('Não foi possível encontrar a aula.');
        }
        const newWatchedLessonData = {
            course: {
                courseTitle: course.title,
                slug: course.slug,
                professor: course.professor,
                image: course.image,
            },
            lesson: {
                lessonTitle: lesson.title,
                lessonDescription: lesson.description,
                slug: lesson.slug,
            },
            watchedAt: Date.now(),
        };
        const updatedUser = await User.findByIdAndUpdate(user_id, { $set: { lastWatched: newWatchedLessonData } }, { new: true, timestamps: false });
        return updatedUser;
    }
}
