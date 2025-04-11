import { Schema, model, Types } from 'mongoose';

interface ILessonProgress {
  lessonId: Types.ObjectId;
  watched: boolean;
  watchedAt: Date;
}

interface ICourseProgress {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  progress: number;
  completed: boolean;
  lastWatchedAt: Date;
  lessons: ILessonProgress[];
}

const lessonProgressSchema = new Schema<ILessonProgress>(
  {
    lessonId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'Lesson',
    },
    watchedAt: Date,
  },
  { _id: false }
);

const courseProgressSchema = new Schema<ICourseProgress>(
  {
    userId: { type: Schema.ObjectId, required: true, ref: 'User', index: true },
    courseId: {
      type: Schema.ObjectId,
      required: true,
      ref: 'Course',
      index: true,
    },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, required: true },
    lastWatchedAt: Date,
    lessons: {
      type: [lessonProgressSchema],
      required: true,
    },
  },
  { timestamps: true }
);

export const CourseProgress = model<ICourseProgress>(
  'Course_progress',
  courseProgressSchema
);
