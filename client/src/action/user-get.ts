import { cookies } from 'next/headers';

import { USER_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { IUser } from '@/common/@types/user';

export default async function getUser() {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new Error('Token não encontrado');

    const { url } = USER_GET();
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'force-cache',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as IUser, error: '', ok: false };
  } catch (error) {
    return apiError(error);
  }
}
