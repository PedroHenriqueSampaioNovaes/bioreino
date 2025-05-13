'use server';

import apiError from '@/common/apiError';
import { LOGIN } from '@/common/api';

import { cookies } from 'next/headers';

interface ILogin {
  email: string;
  password: string;
}

export default async function login({ email, password }: ILogin) {
  try {
    const { url } = LOGIN();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    const cookieStore = await cookies();
    cookieStore.set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(data.tokenExpiresAt),
    });

    return { data: null, ok: true, error: '' };
  } catch (error: unknown) {
    return apiError(error);
  }
}
