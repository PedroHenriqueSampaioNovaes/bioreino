import { Schema, model } from 'mongoose';
const categorySchema = new Schema({
    name: { type: String, required: true },
    plan: { type: Schema.ObjectId, required: true },
    value: { type: String, required: true },
}, { timestamps: true });
export const Category = model('Category', categorySchema);
