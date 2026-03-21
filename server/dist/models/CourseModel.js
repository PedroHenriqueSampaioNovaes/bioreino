import { Schema, model, Types } from 'mongoose';
const courseSchema = new Schema({
    professor: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: Types.ObjectId, required: true },
    lessons: { type: Number, required: true },
    hasLessonFree: { type: Boolean, default: false },
    plan: { type: Schema.ObjectId, ref: 'Plan', required: true },
}, { timestamps: true });
export const Course = model('Course', courseSchema);
