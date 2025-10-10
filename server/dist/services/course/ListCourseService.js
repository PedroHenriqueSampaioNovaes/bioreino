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
exports.ListCourseService = void 0;
const mongoose_1 = require("mongoose");
const CourseModel_1 = require("../../models/CourseModel");
const PlanModel_1 = require("../../models/PlanModel");
const ApiError_1 = require("../../utils/ApiError");
class ListCourseService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ limit, free, planId }) {
            const query = {};
            if (free !== undefined)
                query['free'] = free;
            if (planId && mongoose_1.Types.ObjectId.isValid(planId)) {
                const plan = yield PlanModel_1.Plan.findById(planId);
                if (!plan)
                    throw new ApiError_1.ApiError('Nenhum plano de assinatura foi encontrado.');
                if (!plan.fullaccess)
                    query['plan'] = new mongoose_1.Types.ObjectId(plan.id);
            }
            const courses = yield CourseModel_1.Course.find(query)
                .limit(limit !== null && limit !== void 0 ? limit : 0)
                .populate('plan', '-benefits -price');
            return courses;
        });
    }
}
exports.ListCourseService = ListCourseService;
