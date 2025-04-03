import { Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";

export class CreateUserController {
  static handle(req: Request, res: Response) {
    // AINDA FALTA DESESTRUTURAR ALGUNS DADOS DE USUÁRIO
    const { email, password } = req.body;

    // UTILIZAR O ZOD PARA VALIDAÇÃO
    if (!email) {
      throw new ApiError('O e-mail é obrigatório.');
    }

    if (!password) {
      throw new ApiError('A senha é obrigatória.');
    }

    res.status(200).json({ ok: true });
  }
}
