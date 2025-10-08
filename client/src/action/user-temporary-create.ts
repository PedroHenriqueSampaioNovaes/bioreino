'use server';

import { USER_TEMPORARY_CREATE } from '@/common/api';
import apiError from '@/common/apiError';

import { IUserTemporaryCreate } from '@/common/@types/user';

import FetchApi from '@/common/utils/FetchApi';

export default async function userTemporaryCreate() {
  try {
    const { url } = USER_TEMPORARY_CREATE();
    const data = await FetchApi.post<IUserTemporaryCreate>(url);

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
