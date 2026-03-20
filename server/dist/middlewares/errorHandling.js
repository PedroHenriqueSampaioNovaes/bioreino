import { ApiError } from '../utils/ApiError.js';
import { ZodError } from 'zod';
export function errorHandling(err, req, res, _) {
    if (err instanceof ApiError) {
        return void res
            .status(err.statusCode)
            .json({ ok: false, message: err.message });
    }
    if (err instanceof ZodError) {
        return void res.status(400).json({
            ok: false,
            message: err.issues[0].message,
        });
    }
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
