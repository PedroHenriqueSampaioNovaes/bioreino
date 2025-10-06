"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    professor: { type: String, required: true },
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    category: { type: mongoose_1.Types.ObjectId, required: true },
    lessons: [{ type: mongoose_1.Schema.ObjectId, ref: 'Lesson', required: true }],
    free: { type: Boolean, default: false },
    plan: { type: mongoose_1.Schema.ObjectId, ref: 'Plan', required: true },
}, { timestamps: true });
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
