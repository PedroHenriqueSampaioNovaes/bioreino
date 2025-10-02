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
exports.CreateTemporaryAccountController = void 0;
const mongoose_1 = require("mongoose");
const CreateTemporaryAccountService_1 = require("../../services/user/CreateTemporaryAccountService");
class CreateTemporaryAccountController {
    static handle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const caracteres = 'abcdefghijklmnopqrstuvwxyz';
                const password = caracteres + '0123456789@!*.';
                const dataUser = {
                    name: 'Turista',
                    email: '',
                    password: '',
                    plan: new mongoose_1.Types.ObjectId('6577d2cb69c149d4293871ea'),
                    payment_method: 'pix',
                };
                for (let i = 0; i < 6; i++) {
                    const index = Math.floor(Math.random() * caracteres.length);
                    dataUser['email'] += caracteres[index];
                }
                dataUser['email'] += '@bioreino.com';
                for (let i = 0; i < 8; i++) {
                    const index = Math.floor(Math.random() * password.length);
                    dataUser['password'] += password[index];
                }
                const user = yield CreateTemporaryAccountService_1.CreateTemporaryAccountService.execute(dataUser);
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CreateTemporaryAccountController = CreateTemporaryAccountController;
