'use server';

import { RESET_PASSWORD } from '@/common/api';
import apiError from '@/common/apiError';

interface IResetPassword {
  key: string;
  email: string;
  password: string;
}

export default async function resetPassword({
  key,
  email,
  password,
}: IResetPassword) {
  try {
    const { url } = RESET_PASSWORD();

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: key, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data.message, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
