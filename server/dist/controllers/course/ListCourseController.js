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
exports.ListCourseController = void 0;
const ListCourseService_1 = require("../../services/course/ListCourseService");
class ListCourseController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, free, plan_id } = req.query;
                const courses = yield ListCourseService_1.ListCourseService.execute({
                    limit: limit ? Number(limit) : undefined,
                    free: free === 'true' ? true : free === 'false' ? false : undefined,
                    planId: plan_id,
                });
                res.json(courses);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ListCourseController = ListCourseController;
