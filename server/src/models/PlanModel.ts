import { Schema, model } from 'mongoose';

export interface IPlan {
  name: string;
  price: number;
  benefits: string[];
  fullaccess?: boolean;
}

const plan = new Schema<IPlan>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  benefits: { type: [String], required: true },
  fullaccess: Boolean,
});

export const Plan = model<IPlan>('Plan', plan);
