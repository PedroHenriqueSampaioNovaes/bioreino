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
exports.CreateTemporaryAccountService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const UserModel_1 = require("../../models/UserModel");
const PlanModel_1 = require("../../models/PlanModel");
class CreateTemporaryAccountService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, name, plan: planId, payment_method, }) {
            const userAlreadyExists = yield UserModel_1.User.findOne({ email });
            if (userAlreadyExists) {
                throw new ApiError_1.ApiError('E-mail já existe', 409);
            }
            const plan = yield PlanModel_1.Plan.findById(planId);
            if (!plan) {
                throw new ApiError_1.ApiError('Ocorreu um problema ao tentar obter a assinatura');
            }
            const now = new Date();
            now.setDate(now.getDate() + 1);
            const user = new UserModel_1.User({
                email,
                password,
                name,
                plan: plan._id,
                status: 'active',
                payment_method,
                accountExpiresAfter: now,
            });
            yield user.save();
            return {
                _id: user._id,
                email: user.email,
                password: user.password,
                accountExpiresAfter: now,
            };
        });
    }
}
exports.CreateTemporaryAccountService = CreateTemporaryAccountService;
