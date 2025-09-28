'use server';

import { USER_TEMPORARY_CREATE } from '@/common/api';
import apiError from '@/common/apiError';

import { IUserTemporaryCreate } from '@/common/@types/user';

export default async function userTemporaryCreate() {
  try {
    const { url } = USER_TEMPORARY_CREATE();
    const response = await fetch(url, {
      method: 'POST',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as IUserTemporaryCreate, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
