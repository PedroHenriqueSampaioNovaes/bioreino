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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
const createUser_1 = require("../../schema/createUser");
class CreateUserController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bodyData = createUser_1.bodyScheme.parse(req.body);
                const keyAddress = [
                    'state',
                    'cep',
                    'street',
                    'home_number',
                    'neighborhood',
                ];
                const keyCard = [
                    'card_number',
                    'cardholder_name',
                    'validate',
                    'cvv',
                    'installment',
                ];
                const addressFields = Object.entries(bodyData)
                    .filter(([key]) => keyAddress.includes(key))
                    .reduce((obj, [key, value]) => (Object.assign(Object.assign({}, obj), { [key]: value })), {});
                const cardFields = Object.entries(bodyData)
                    .filter(([key]) => keyCard.includes(key))
                    .reduce((obj, [key, value]) => (Object.assign(Object.assign({}, obj), { [key]: value })), {});
                const user = yield CreateUserService_1.CreateUserService.execute(Object.assign(Object.assign({}, bodyData), { address: addressFields, card: cardFields }));
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CreateUserController = CreateUserController;
