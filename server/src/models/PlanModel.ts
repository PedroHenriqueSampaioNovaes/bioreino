import { Schema, Types, model } from 'mongoose';

export interface IPlan {
  _id: Types.ObjectId;
  name: string;
  price: number;
  benefits: string[];
  fullaccess?: boolean;
  stripe_price_id: string;
}

const plan = new Schema<IPlan>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  benefits: { type: [String], required: true },
  fullaccess: Boolean,
  stripe_price_id: { type: String, required: true },
});

export const Plan = model<IPlan>('Plan', plan);
