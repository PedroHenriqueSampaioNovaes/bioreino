import { Schema, model } from 'mongoose';
const lessonProgressSchema = new Schema({
    lessonId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Lesson',
    },
    watchedAt: Date,
}, { _id: false });
const courseProgressSchema = new Schema({
    userId: { type: Schema.ObjectId, required: true, ref: 'User', index: true },
    courseId: {
        type: Schema.ObjectId,
        required: true,
        ref: 'Course',
        index: true,
    },
    progress: { type: Number, default: 0 },
    completed: { type: Boolean, required: true },
    lastWatchedAt: Date,
    lessons: {
        type: [lessonProgressSchema],
        required: true,
    },
}, { timestamps: true });
export const CourseProgress = model('Course_progress', courseProgressSchema);
