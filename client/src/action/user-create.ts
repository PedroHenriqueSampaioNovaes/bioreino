'use server';

import { USER_CREATE } from '@/common/api';
import apiError from '@/common/apiError';

import { IUserCreate, IUserPost } from '@/common/@types/user';

import FetchApi from '@/common/utils/FetchApi';

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
