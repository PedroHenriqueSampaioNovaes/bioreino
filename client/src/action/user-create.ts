'use server';

import { USER_CREATE } from '@/common/api';
import apiError from '@/common/apiError';

import { IUserCreate } from '@/common/@types/user';

import FetchApi from '@/common/utils/FetchApi';

interface IUserPost {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  subscriptionId: string;
  payment_method?: string;
  state?: string;
  cep?: string;
  street?: string;
  home_number?: string;
  neighborhood?: string;
  card_number?: string;
  cardholder_name?: string;
  validate?: string;
  cvv?: string;
  installment?: string;
}

export default async function userCreate(body: IUserPost) {
  try {
    const { url } = USER_CREATE();
    const data = await FetchApi.post<IUserCreate>(url, {
      body,
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
