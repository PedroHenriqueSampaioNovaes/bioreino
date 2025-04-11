import { ApiError } from '../../utils/ApiError';

import { Course } from '../../models/CourseModel';
import { Lesson } from '../../models/LessonModel';
import { CourseProgress } from '../../models/CourseProgressModel';

interface ICourseProgressRequest {
  courseId: string;
  lessonId: string;
  user_id: string;
}

export class UpdateCourseProgressService {
  static async execute({
    user_id,
    courseId,
    lessonId,
  }: ICourseProgressRequest) {
    const course = await Course.findById(courseId);
    if (!course) {
      throw new ApiError('Não foi possível encontrar o curso.');
    }

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      throw new ApiError('Não foi possível encontrar a aula.');
    }

    const courseProgress = await CourseProgress.findOne({
      userId: user_id,
      courseId,
    });

    const lessonAlreadyWatched = courseProgress?.lessons.some(
      (lessonInProgress) => lessonInProgress.lessonId.equals(lesson._id)
    );
    if (lessonAlreadyWatched) return;

    // Calculates the course progress
    const quantityLessonsWatched = courseProgress
      ? courseProgress.lessons.length + 1
      : 1;
    const quantityLessonsInTheCourse = course.lessons.length;

    const progress = +(
      (quantityLessonsWatched / quantityLessonsInTheCourse) *
      100
    ).toFixed(2);

    // Updates the course progress with a new lesson or creates
    // it if the document for this course progress related to the user does not exist
    await CourseProgress.findOneAndUpdate(
      { userId: user_id, courseId },
      {
        $set: {
          userId: user_id,
          courseId,
          progress,
          completed: progress === 100 ? true : false,
          lastWatchedAt: new Date(),
        },
        $addToSet: {
          lessons: {
            lessonId,
            watchedAt: new Date(),
          },
        },
      },
      { upsert: true }
    );
  }
}
