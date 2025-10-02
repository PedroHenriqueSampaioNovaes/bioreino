"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.basePaymentMethodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.basePaymentMethodSchema = zod_1.default.object({
    payment_method: zod_1.default.enum(['pix', 'credit_card', 'bank_slip', 'stripe'], {
        required_error: 'O método de pagamento é obrigatório.',
        message: 'Escolha um método de pagamento válido.',
    }),
    state: zod_1.default.string().optional(),
    cep: zod_1.default.string().optional(),
    street: zod_1.default.string().optional(),
    home_number: zod_1.default.string().optional(),
    neighborhood: zod_1.default.string().optional(),
    card_number: zod_1.default.string().optional(),
    cardholder_name: zod_1.default.string().optional(),
    validate: zod_1.default.string().optional(),
    cvv: zod_1.default.string().optional(),
    installment: zod_1.default.string().optional(),
});
