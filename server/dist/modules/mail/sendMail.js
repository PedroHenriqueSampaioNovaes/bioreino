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
exports.sendMail = sendMail;
const mailer_1 = require("../../config/mailer");
const ApiError_1 = require("../../utils/ApiError");
function sendMail(mailOptions, successMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (mailOptions.to)
                yield mailer_1.transporter.sendMail(mailOptions);
            return successMessage || 'E-mail enviado com sucesso!';
        }
        catch (err) {
            console.error(err);
            throw new ApiError_1.ApiError('Tivemos um problema ao tentar enviar o e-mail de redefinição de senha. Tente novamente mais tarde.', 400);
        }
    });
}
