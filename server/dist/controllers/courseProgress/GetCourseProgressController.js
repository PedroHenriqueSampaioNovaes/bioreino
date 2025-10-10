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
exports.GetCourseProgressController = void 0;
const GetCourseProgressService_1 = require("../../services/courseProgress/GetCourseProgressService");
class GetCourseProgressController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req;
                const progress = yield GetCourseProgressService_1.GetCourseProgressService.execute({
                    user_id,
                });
                res.json(progress);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.GetCourseProgressController = GetCourseProgressController;
