import jwt from 'jsonwebtoken';
export function isAuthenticated(req) {
    try {
        const authToken = req.headers.authorization;
        if (!authToken)
            throw '';
        const [, token] = authToken.split(' ');
        jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return true;
    }
    catch {
        return false;
    }
}
