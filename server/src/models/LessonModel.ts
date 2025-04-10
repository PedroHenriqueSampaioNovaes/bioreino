import { Schema, model } from 'mongoose';

interface ILesson {
  title: string;
  description: string;
  videoUrl: string;
  transcription: string;
  slug: string;
  courseTitle: string;
}

const lessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    transcription: { type: String, required: true },
    slug: { type: String, required: true },
    courseTitle: { type: String, required: true },
  },
  { timestamps: true }
);

export const Lesson = model<ILesson>('Lesson', lessonSchema);
