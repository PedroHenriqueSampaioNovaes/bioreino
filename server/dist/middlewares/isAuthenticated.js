import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
export function isAuthenticated(req, res, next) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken)
            throw '';
        const [, token] = authToken.split(' ');
        const { sub } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user_id = sub;
        next();
    }
    catch {
        throw new ApiError('Acesso negado.', 401);
    }
}
