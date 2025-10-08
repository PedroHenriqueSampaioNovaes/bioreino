'use server';

import { FORGOT_PASSWORD } from '@/common/api';
import apiError from '@/common/apiError';

import FetchApi from '@/common/utils/FetchApi';

interface IForgot {
  message: string;
}

export default async function forgotPassword({ email }: { email: string }) {
  try {
    const { url } = FORGOT_PASSWORD();
    const data = await FetchApi.post<IForgot>(url, { body: { email } });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
