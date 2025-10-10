"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lesson = void 0;
const mongoose_1 = require("mongoose");
const lessonSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    transcription: { type: String, required: true },
    slug: { type: String, required: true },
    courseTitle: { type: String, required: true },
}, { timestamps: true });
exports.Lesson = (0, mongoose_1.model)('Lesson', lessonSchema);
