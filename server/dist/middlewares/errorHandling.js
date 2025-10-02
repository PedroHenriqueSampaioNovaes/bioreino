"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = errorHandling;
const ApiError_1 = require("../utils/ApiError");
const zod_1 = require("zod");
function errorHandling(err, req, res, _) {
    if (err instanceof ApiError_1.ApiError) {
        return void res
            .status(err.statusCode)
            .json({ ok: false, message: err.message });
    }
    if (err instanceof zod_1.ZodError) {
        return void res.status(400).json({
            ok: false,
            message: err.issues[0].message,
        });
    }
    // Error due to data type conflict with the Mongoose schema.
    if (err.name === 'ValidationError') {
        return void res.status(400).json({
            ok: false,
            message: 'Erro de validação.',
            issues: err.errors,
        });
    }
    return void res
        .status(500)
        .json({ ok: false, message: err.message });
}
