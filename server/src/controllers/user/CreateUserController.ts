import { NextFunction, Request, Response } from 'express';

import { CreateUserService } from '../../services/user/CreateUserService.js';

import { IAddress } from '../../@types/user/address.js';
import { ICard } from '../../@types/user/payment.js';

import { bodyScheme } from '../../schema/createUser.js';

export class CreateUserController {
  static async handle(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyData = bodyScheme.parse(req.body);

      const keyAddress = [
        'state',
        'cep',
        'street',
        'home_number',
        'neighborhood',
      ];

      const keyCard = [
        'card_number',
        'cardholder_name',
        'validate',
        'cvv',
        'installment',
      ];

      const addressFields = Object.entries(bodyData)
        .filter(([key]) => keyAddress.includes(key))
        .reduce(
          (obj: IAddress, [key, value]) => ({
            ...obj,
            [key]: value,
          }),
          {}
        );

      const cardFields = Object.entries(bodyData)
        .filter(([key]) => keyCard.includes(key))
        .reduce(
          (obj: ICard, [key, value]) => ({
            ...obj,
            [key]: value,
          }),
          {}
        );

      const user = await CreateUserService.execute({
        ...bodyData,
        address: addressFields,
        card: cardFields,
      });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
}
