import { Schema, model } from 'mongoose';
const plan = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    benefits: { type: [String], required: true },
    fullaccess: Boolean,
    stripe_price_id: { type: String, required: true },
});
export const Plan = model('Plan', plan);
