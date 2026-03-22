import { ApiError } from '../../utils/ApiError.js';

import { User } from '../../models/UserModel.js';
import { Course } from '../../models/CourseModel.js';
import { Lesson } from '../../models/LessonModel.js';

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
      course: course._id,
      lesson: lesson._id,
      watchedAt: Date.now(),
    };

    const updatedUser = await User.findByIdAndUpdate(
      user_id,
      { $set: { lastWatched: newWatchedLessonData } },
      { new: true, timestamps: false },
    );

    return updatedUser;
  }
}
