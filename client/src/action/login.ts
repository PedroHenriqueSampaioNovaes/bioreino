'use server';

import apiError from '@/common/apiError';
import { LOGIN } from '@/common/api';

import FetchApi from '@/common/utils/FetchApi';

import { cookies } from 'next/headers';

interface ILogin {
  email: string;
  password: string;
}

export default async function login({ email, password }: ILogin) {
  try {
    const { url } = LOGIN();

    const data = await FetchApi.post<{
      token: string;
      tokenExpiresAt: string;
      userId: string;
    }>(url, { body: { email, password } });

    if (data) {
      const cookieStore = await cookies();
      cookieStore.set('token', data.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(data.tokenExpiresAt),
      });

      cookieStore.set('user_id', data.userId, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        expires: new Date(data.tokenExpiresAt),
      });
    }

    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
