import { NextFunction, Request, Response } from 'express';

import { CreateTemporaryAccountService } from '../../services/user/CreateTemporaryAccountService';

interface IDataUser {
  name: string;
  email: string;
  password: string;
  planId: string;
}

export class TemporaryAccountController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const caracteres = 'abcdefghijklmnopqrstuvwxyz';
      const password = caracteres + '0123456789@!*.';

      const dataUser: IDataUser = {
        name: 'Turista',
        email: '',
        password: '',
        planId: '6577d38d69c149d4293871ec',
      };

      for (let i = 0; i < 15; i++) {
        const index = Math.floor(Math.random() * caracteres.length);
        dataUser['email'] += caracteres[index];
      }
      dataUser['email'] += '@bioreino.com';

      for (let i = 0; i < 8; i++) {
        const index = Math.floor(Math.random() * password.length);
        dataUser['password'] += password[index];
      }

      const user = await CreateTemporaryAccountService.execute(dataUser);

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
