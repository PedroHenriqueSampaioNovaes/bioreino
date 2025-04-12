import { Schema, model } from 'mongoose';

export interface ICategory {
  name: string;
  plan: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    plan: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>('Category', categorySchema);
