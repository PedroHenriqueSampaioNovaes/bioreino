import { Schema, Types, model } from 'mongoose';

export interface ILesson {
  title: string;
  description: string;
  video: string;
  transcription: string;
  slug: string;
  courseId: Types.ObjectId;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String, required: true },
    transcription: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    courseId: { type: Schema.ObjectId, ref: 'Course', required: true },
  },
  { timestamps: true }
);

export const Lesson = model<ILesson>('Lesson', lessonSchema);
