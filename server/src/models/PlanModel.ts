import { Schema, model } from 'mongoose';

export interface IPlan {
  name: string;
  price: string;
  benefits: string[];
  fullaccess?: boolean;
}

const plan = new Schema<IPlan>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  benefits: { type: [String], required: true },
});

export const Plan = model<IPlan>('Plan', plan);
