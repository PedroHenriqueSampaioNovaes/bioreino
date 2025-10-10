"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLastWatchedService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const UserModel_1 = require("../../models/UserModel");
const CourseModel_1 = require("../../models/CourseModel");
const LessonModel_1 = require("../../models/LessonModel");
class UpdateLastWatchedService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, courseId, lessonId }) {
            const course = yield CourseModel_1.Course.findById(courseId);
            if (!course) {
                throw new ApiError_1.ApiError('Não foi possível encontrar o curso.');
            }
            const lesson = yield LessonModel_1.Lesson.findById(lessonId);
            if (!lesson) {
                throw new ApiError_1.ApiError('Não foi possível encontrar a aula.');
            }
            const newWatchedLessonData = {
                course: {
                    courseTitle: course.title,
                    slug: course.slug,
                    professor: course.professor,
                    imageUrl: course.imageUrl,
                },
                lesson: {
                    lessonTitle: lesson.title,
                    lessonDescription: lesson.description,
                    slug: lesson.slug,
                },
                watchedAt: Date.now(),
            };
            const updatedUser = yield UserModel_1.User.findByIdAndUpdate(user_id, { $set: { lastWatched: newWatchedLessonData } }, { new: true, timestamps: false });
            return updatedUser;
        });
    }
}
exports.UpdateLastWatchedService = UpdateLastWatchedService;
