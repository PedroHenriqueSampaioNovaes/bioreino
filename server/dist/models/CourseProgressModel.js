"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseProgress = void 0;
const mongoose_1 = require("mongoose");
const lessonProgressSchema = new mongoose_1.Schema({
    lessonId: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
        ref: 'Lesson',
    },
    watchedAt: Date,
}, { _id: false });
const courseProgressSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.ObjectId, required: true, ref: 'User', index: true },
    courseId: {
        type: mongoose_1.Schema.ObjectId,
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
exports.CourseProgress = (0, mongoose_1.model)('Course_progress', courseProgressSchema);
