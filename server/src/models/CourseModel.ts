import { Schema, model, Types } from 'mongoose';

import { IPlan } from './PlanModel';

export interface ICourse {
  professor: string;
  imageUrl: string;
  title: string;
  slug: string;
  category: {
    _id: Types.ObjectId;
    plan: Types.ObjectId;
    name: string;
    value: string;
  };
  lessons:
    | {
        _id: Types.ObjectId;
        title: string;
        description: string;
        transcription: string;
        videoUrl: string;
        slug: string;
      }[]
    | Types.ObjectId[];
  free: boolean;
  plan: Types.ObjectId | IPlan;
}

const courseSchema = new Schema<ICourse>(
  {
    professor: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: Types.ObjectId, required: true },
    lessons: {
      type: [Schema.ObjectId],
      required: true,
    },
    free: { type: Boolean, default: false },
    plan: { type: Schema.ObjectId, ref: 'Plan', required: true },
  },
  { timestamps: true }
);

export const Course = model<ICourse>('Course', courseSchema);
