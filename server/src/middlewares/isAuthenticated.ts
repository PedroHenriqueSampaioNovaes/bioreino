import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { ApiError } from '../utils/ApiError';

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) throw '';

    const [, token] = authToken.split(' ');

    const { sub } = verify(token, process.env.JWT_PRIVATE_KEY as string);
    req.user_id = sub as string;

    next();
  } catch {
    throw new ApiError('Acesso negado.', 401);
  }
}
