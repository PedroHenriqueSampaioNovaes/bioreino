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
exports.UpdateUserController = void 0;
const zod_1 = require("zod");
const UpdateUserService_1 = require("../../services/user/UpdateUserService");
const payments_1 = require("../../schema/payments");
class UpdateUserController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { user_id } = req;
                const bodyScheme = zod_1.z.object({
                    subscriptionId: zod_1.z.string({
                        required_error: 'O _id do plano de assinatura é obrigatório.',
                    }),
                    payment_method: payments_1.basePaymentMethodSchema.shape.payment_method,
                });
                const bodyData = bodyScheme.parse(req.body);
                const updatedUser = yield UpdateUserService_1.UpdateUserService.execute(Object.assign(Object.assign({}, bodyData), { user_id }));
                res.json(updatedUser);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UpdateUserController = UpdateUserController;
