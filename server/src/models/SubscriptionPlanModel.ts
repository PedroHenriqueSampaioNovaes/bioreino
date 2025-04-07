import { Schema, model } from 'mongoose';

export interface ISubscriptionPlan {
  name: string;
  price: string;
  benefits: string[];
}

const subscriptionPlanSchema = new Schema<ISubscriptionPlan>({
  name: { type: String, required: true },
  price: { type: String, required: true },
  benefits: { type: [String], required: true },
});

export const SubscriptionPlan = model<ISubscriptionPlan>(
  'Plan',
  subscriptionPlanSchema
);
