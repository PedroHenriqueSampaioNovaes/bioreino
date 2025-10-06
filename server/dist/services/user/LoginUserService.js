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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("../../utils/ApiError");
const UserModel_1 = require("../../models/UserModel");
class LoginUserService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            const user = yield UserModel_1.User.findOne({ email }).select('+accountExpiresAfter');
            if (!user) {
                throw new ApiError_1.ApiError('E-mail ou senha incorreto.');
            }
            const isTemporaryAccount = !!user.accountExpiresAfter;
            // compare the password with db password
            let matchPassword;
            if (isTemporaryAccount) {
                matchPassword = password === user.password;
            }
            else {
                matchPassword = (0, bcryptjs_1.compareSync)(password, user.password);
            }
            if (!matchPassword) {
                throw new ApiError_1.ApiError('E-mail ou senha incorreto.');
            }
            if (user.status !== 'active') {
                throw new ApiError_1.ApiError('Conta inativa. Ative-a efetuando o pagamento da assinatura.');
            }
            const daysForTokenToExpires = 7;
            const tokenExpiresAt = new Date();
            tokenExpiresAt.setDate(tokenExpiresAt.getDate() + daysForTokenToExpires);
            const token = jsonwebtoken_1.default.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWT_PRIVATE_KEY, { subject: user._id.toString(), expiresIn: `${daysForTokenToExpires}d` });
            return {
                userId: user._id,
                token,
                tokenExpiresAt,
            };
        });
    }
}
exports.LoginUserService = LoginUserService;
