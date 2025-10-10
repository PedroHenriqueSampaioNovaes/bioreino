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
exports.UpdateCourseProgressController = void 0;
const zod_1 = require("zod");
const UpdateCourseProgressService_1 = require("../../services/courseProgress/UpdateCourseProgressService");
class UpdateCourseProgressController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req;
                const bodyScheme = zod_1.z.object({
                    courseId: zod_1.z.string({ required_error: 'O _id do curso é obrigatório.' }),
                    lessonId: zod_1.z.string({ required_error: 'O _id da aula é obrigatório.' }),
                });
                const bodyData = bodyScheme.parse(Object.assign(Object.assign({}, req.body), { courseId: req.params.course_id }));
                yield UpdateCourseProgressService_1.UpdateCourseProgressService.execute(Object.assign(Object.assign({}, bodyData), { user_id }));
                res.end();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UpdateCourseProgressController = UpdateCourseProgressController;
