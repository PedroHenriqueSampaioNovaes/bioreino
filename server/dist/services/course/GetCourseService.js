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
exports.GetCourseService = void 0;
const CourseModel_1 = require("../../models/CourseModel");
const ApiError_1 = require("../../utils/ApiError");
class GetCourseService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ slug }) {
            const course = yield CourseModel_1.Course.findOne({ slug }).populate('lessons');
            if (!course) {
                throw new ApiError_1.ApiError('Curso não encontrado!', 404);
            }
            return course;
        });
    }
}
exports.GetCourseService = GetCourseService;
