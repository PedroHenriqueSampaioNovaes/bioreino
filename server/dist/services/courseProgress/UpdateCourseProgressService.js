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
exports.UpdateCourseProgressService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const CourseModel_1 = require("../../models/CourseModel");
const LessonModel_1 = require("../../models/LessonModel");
const CourseProgressModel_1 = require("../../models/CourseProgressModel");
const UserModel_1 = require("../../models/UserModel");
class UpdateCourseProgressService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, courseId, lessonId, }) {
            const course = yield CourseModel_1.Course.findById(courseId);
            if (!course) {
                throw new ApiError_1.ApiError('Não foi possível encontrar o curso.');
            }
            const lesson = yield LessonModel_1.Lesson.findById(lessonId);
            if (!lesson) {
                throw new ApiError_1.ApiError('Não foi possível encontrar a aula.');
            }
            // Check if the lesson actually belongs to the course
            const lessonBelongsToCourse = course.lessons.some((lesson) => {
                return lesson._id.equals(lessonId);
            });
            if (!lessonBelongsToCourse) {
                throw new ApiError_1.ApiError(`A aula "${lesson.title}" não pertence ao curso informado.`);
            }
            // Updates the last lesson watched of the user
            yield UserModel_1.User.findOneAndUpdate({ _id: user_id }, {
                $set: {
                    lastWatched: {
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
                        watchedAt: new Date(),
                    },
                },
            });
            const courseProgress = yield CourseProgressModel_1.CourseProgress.findOne({
                userId: user_id,
                courseId,
            });
            // If the lesson is already watched, we do not need to update the progress
            const lessonAlreadyWatched = courseProgress === null || courseProgress === void 0 ? void 0 : courseProgress.lessons.some((lessonInProgress) => lessonInProgress.lessonId.equals(lesson._id));
            if (lessonAlreadyWatched)
                return;
            // Calculates the course progress
            const quantityLessonsWatched = courseProgress
                ? courseProgress.lessons.length + 1
                : 1;
            const quantityLessonsInTheCourse = course.lessons.length;
            const progress = Math.ceil((quantityLessonsWatched / quantityLessonsInTheCourse) * 100);
            // Updates the course progress with a new lesson or creates
            // it if the document for this course progress related to the user does not exist
            yield CourseProgressModel_1.CourseProgress.findOneAndUpdate({ userId: user_id, courseId }, {
                $set: {
                    userId: user_id,
                    courseId,
                    progress,
                    completed: progress === 100 ? true : false,
                    lastWatchedAt: new Date(),
                },
                $addToSet: {
                    lessons: {
                        lessonId,
                        watchedAt: new Date(),
                    },
                },
            }, { upsert: true });
        });
    }
}
exports.UpdateCourseProgressService = UpdateCourseProgressService;
