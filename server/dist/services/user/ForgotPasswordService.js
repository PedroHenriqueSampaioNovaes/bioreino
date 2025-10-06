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
exports.ForgotPasswordService = void 0;
const UserModel_1 = require("../../models/UserModel");
const crypto_1 = __importDefault(require("crypto"));
class ForgotPasswordService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email }) {
            const user = yield UserModel_1.User.findOne({ email });
            if (!user)
                return { token: '', email: '' };
            const token = crypto_1.default.randomBytes(20).toString('hex');
            const now = new Date();
            now.setMinutes(now.getMinutes() + 15);
            yield UserModel_1.User.findByIdAndUpdate(user._id, {
                $set: { passwordResetToken: token, passwordResetExpires: now },
            });
            return { token, email: user.email };
        });
    }
}
exports.ForgotPasswordService = ForgotPasswordService;
