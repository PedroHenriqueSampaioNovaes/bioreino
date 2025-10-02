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
exports.ForgotPasswordController = void 0;
const zod_1 = require("zod");
const ForgotPasswordService_1 = require("../../services/user/ForgotPasswordService");
const sendMail_1 = require("../../modules/sendMail");
class ForgotPasswordController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req;
                const bodyScheme = zod_1.z.object({
                    email: zod_1.z.string({ required_error: 'O email é obrigatório.' }),
                });
                const bodyData = bodyScheme.parse(req.body);
                const { email, token } = yield ForgotPasswordService_1.ForgotPasswordService.execute(Object.assign(Object.assign({}, bodyData), { user_id }));
                const message = yield (0, sendMail_1.sendMail)({
                    from: 'suporte@bioreino.com.br',
                    to: email,
                    subject: 'Pedido de redefinição de senha',
                    template: 'auth/forgot_password',
                    context: { user_email: bodyData.email, token },
                }, 'E-mail de redefinição de senha enviado com sucesso! Por favor, verifique sua caixa de spam.');
                res.json({ message });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
