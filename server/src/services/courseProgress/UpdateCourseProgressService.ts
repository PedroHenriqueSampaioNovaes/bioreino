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

    // Check if the lesson actually belongs to the course
    const lessonBelongsToCourse = course.lessons.some((lesson) => {
      return lesson._id.equals(lessonId);
    });
    if (!lessonBelongsToCourse) {
      throw new ApiError(
        `A aula "${lesson.title}" não pertence ao curso informado.`
      );
    }

    const courseProgress = await CourseProgress.findOne({
      userId: user_id,
      courseId,
    });

    // If the lesson is already watched, we do not need to update the progress
    const lessonAlreadyWatched = courseProgress?.lessons.some(
      (lessonInProgress) => lessonInProgress.lessonId.equals(lesson._id)
    );
    if (lessonAlreadyWatched) return;

    // Calculates the course progress
    const quantityLessonsWatched = courseProgress
      ? courseProgress.lessons.length + 1
      : 1;
    const quantityLessonsInTheCourse = course.lessons.length;

    const progress = Math.ceil(
      (quantityLessonsWatched / quantityLessonsInTheCourse) * 100
    );

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
