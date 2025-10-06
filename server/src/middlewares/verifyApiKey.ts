import { NextFunction, Request, Response } from 'express';

export function verifyApiKey(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const apiKey = request.headers['x-api-key'];

  if (apiKey !== process.env.API_KEY) {
    response.json({ message: 'Acesso negado. Chave de API inválida.' });
    return;
  }

  next();
}
