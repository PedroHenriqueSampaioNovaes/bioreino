"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = isAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const ApiError_1 = require("../utils/ApiError");
function isAuthenticated(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken)
            throw '';
        const [, token] = authToken.split(' ');
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.JWT_PRIVATE_KEY);
        req.user_id = sub;
        next();
    }
    catch (_a) {
        throw new ApiError_1.ApiError('Acesso negado.', 401);
    }
}
