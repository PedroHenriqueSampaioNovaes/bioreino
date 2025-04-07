import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';
import { ZodError } from 'zod';

export function errorHandling(err: any, req: Request, res: Response, _: any) {
  if (err instanceof ApiError) {
    return void res
      .status(err.statusCode)
      .json({ ok: false, message: err.message });
  }

  if (err instanceof ZodError) {
    return void res.status(400).json({
      ok: false,
      message: 'Erro de validação.',
      issues: err.flatten(),
    });
  }

  return void res
    .status(500)
    .json({ ok: false, message: (err as Error).message });
}
