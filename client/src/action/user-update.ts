'use server';

import { USER_UPDATE } from '@/common/api';
import apiError from '@/common/apiError';

import { IUserDataUpdate, IUserUpdate } from '@/common/@types/user';
import { cookies } from 'next/headers';

import FetchApi from '@/common/utils/FetchApi';

export default async function userUpdate(body: IUserUpdate) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new Error('Token não encontrado');

    const { url } = USER_UPDATE();
    const data = await FetchApi.patch<IUserDataUpdate>(url, {
      token,
      body,
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
