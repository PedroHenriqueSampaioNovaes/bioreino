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
exports.LoginUserController = void 0;
const zod_1 = require("zod");
const LoginUserService_1 = require("../../services/user/LoginUserService");
class LoginUserController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bodyScheme = zod_1.z.object({
                    email: zod_1.z.string({ required_error: 'O e-mail é obrigatório.' }),
                    password: zod_1.z.string({ required_error: 'A senha é obrigatória.' }),
                });
                const bodyData = bodyScheme.parse(req.body);
                const user = yield LoginUserService_1.LoginUserService.execute(bodyData);
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
