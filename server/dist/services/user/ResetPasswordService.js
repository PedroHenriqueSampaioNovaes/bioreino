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
exports.ResetPasswordService = void 0;
const UserModel_1 = require("../../models/UserModel");
const bcryptjs_1 = require("bcryptjs");
const ApiError_1 = require("../../utils/ApiError");
class ResetPasswordService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, token, password }) {
            const user = yield UserModel_1.User.findOne({ email }).select('+passwordResetToken +passwordResetExpires');
            if (!user) {
                throw new ApiError_1.ApiError('E-mail incorreto.', 400);
            }
            if (user.passwordResetToken !== token) {
                throw new ApiError_1.ApiError('Token inválido.', 400);
            }
            if (!user.passwordResetExpires) {
                throw new ApiError_1.ApiError('Não foi identificado nenhuma solicitação de redefinição de senha.', 400);
            }
            const now = new Date();
            if (now > user.passwordResetExpires) {
                throw new ApiError_1.ApiError('Token expirado.', 400);
            }
            const salt = (0, bcryptjs_1.genSaltSync)();
            user.password = (0, bcryptjs_1.hashSync)(password, salt);
            yield UserModel_1.User.findByIdAndUpdate(user.id, user);
        });
    }
}
exports.ResetPasswordService = ResetPasswordService;
