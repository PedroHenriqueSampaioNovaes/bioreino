import { Schema, model, Types } from 'mongoose';

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
  lessons: number;
  free: boolean;
  plan: Types.ObjectId;
}

const courseSchema = new Schema<ICourse>(
  {
    professor: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: Types.ObjectId, required: true },
    lessons: { type: Number, required: true },
    free: { type: Boolean, default: false },
    plan: { type: Schema.ObjectId, ref: 'Plan', required: true },
  },
  { timestamps: true },
);

export const Course = model<ICourse>('Course', courseSchema);
