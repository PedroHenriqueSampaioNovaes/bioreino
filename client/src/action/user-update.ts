'use server';

import { USER_UPDATE } from '@/common/api';
import apiError from '@/common/apiError';

import { IUserDataUpdate, IUserUpdate } from '@/common/@types/user';
import { cookies } from 'next/headers';

export default async function userUpdate(body: IUserUpdate) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new Error('Token não encontrado');

    const { url } = USER_UPDATE();
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as IUserDataUpdate, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
