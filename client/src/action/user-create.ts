'use server';

import { USER_CREATE } from '@/common/api';
import apiError from '@/common/apiError';

import { IUserCreate, IUserPost } from '@/common/@types/user';

export default async function userCreate(body: IUserPost) {
  try {
    const { url } = USER_CREATE();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as IUserCreate, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
