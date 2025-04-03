import { Request, Response } from 'express';
import { ApiError } from '../utils/ApiError';

export function errorHandling(err: any, req: Request, res: Response, _: any) {
  if (err instanceof ApiError) {
    return void res
      .status(err.statusCode)
      .json({ ok: false, message: err.message });
  }

  return void res
    .status(500)
    .json({ ok: false, message: (err as Error).message });
}
