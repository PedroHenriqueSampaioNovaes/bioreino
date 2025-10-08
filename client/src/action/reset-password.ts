'use server';

import { RESET_PASSWORD } from '@/common/api';
import apiError from '@/common/apiError';

import FetchApi from '@/common/utils/FetchApi';

interface IResetPassword {
  key: string;
  email: string;
  password: string;
}

interface IResetPasswordData {
  message: string;
}

export default async function resetPassword({
  key,
  email,
  password,
}: IResetPassword) {
  try {
    const { url } = RESET_PASSWORD();
    const data = await FetchApi.patch<IResetPasswordData>(url, {
      body: { token: key, email, password },
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
