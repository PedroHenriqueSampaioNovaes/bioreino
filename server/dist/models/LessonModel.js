import { Schema, model } from 'mongoose';
const lessonSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: { type: String, required: true, select: false },
    transcription: { type: String, required: true, select: false },
    slug: { type: String, required: true, unique: true },
    courseId: { type: Schema.ObjectId, ref: 'Course', required: true },
    free: { type: Boolean, default: false },
}, { timestamps: true });
export const Lesson = model('Lesson', lessonSchema);
