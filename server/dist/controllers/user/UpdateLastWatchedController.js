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
exports.UpdateLastWatchedController = void 0;
const zod_1 = require("zod");
const UpdateLastWatchedService_1 = require("../../services/user/UpdateLastWatchedService");
class UpdateLastWatchedController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req;
                const bodyScheme = zod_1.z.object({
                    courseId: zod_1.z.string({ required_error: 'O _id do curso é obrigatório.' }),
                    lessonId: zod_1.z.string({ required_error: 'O _id da aula é obrigatório.' }),
                });
                const bodyData = bodyScheme.parse(req.body);
                const updatedUser = yield UpdateLastWatchedService_1.UpdateLastWatchedService.execute(Object.assign(Object.assign({}, bodyData), { user_id }));
                res.json(updatedUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UpdateLastWatchedController = UpdateLastWatchedController;
