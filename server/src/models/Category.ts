import { Schema, Types, model } from 'mongoose';

export interface ICategory {
  name: string;
  plan: Types.ObjectId;
  value: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    plan: { type: Schema.ObjectId, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>('Category', categorySchema);
