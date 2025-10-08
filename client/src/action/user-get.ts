'use server';

import { cookies } from 'next/headers';

import { USER_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { IUser } from '@/common/@types/user';

import FetchApi from '@/common/utils/FetchApi';

export default async function getUser() {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new Error('Token não encontrado');

    const { url } = USER_GET();
    const data = await FetchApi.get<IUser>(url, { token });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
