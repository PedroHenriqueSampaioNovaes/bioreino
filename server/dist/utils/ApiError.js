"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError {
    constructor(message, statusCode = 422) {
        this.message = message;
        this.statusCode = statusCode;
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ApiError = ApiError;
