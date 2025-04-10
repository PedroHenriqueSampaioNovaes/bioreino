import { ApiError } from '../../utils/ApiError';

import { User } from '../../models/UserModel';
import { Course } from '../../models/CourseModel';
import { Lesson } from '../../models/LessonModel';

interface IWatchedLessonRequest {
  courseId: string;
  lessonId: string;
  user_id: string;
}

export class UpdateLastWatchedService {
  static async execute({ user_id, courseId, lessonId }: IWatchedLessonRequest) {
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
        imageUrl: course.imageUrl,
      },
      lesson: {
        lessonTitle: lesson.title,
        lessonDescription: lesson.description,
        slug: lesson.slug,
      },
      watchedAt: Date.now(),
    };

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $set: { lastWatched: newWatchedLessonData } },
      { new: true, timestamps: false }
    );

    return updatedUser;
  }
}
