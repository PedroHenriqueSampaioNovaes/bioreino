'use server';

import { USER_COURSE_PROGRESS_GET } from '@/common/api';
import apiError from '@/common/apiError';
import { IProgress } from '@/common/@types/course';

import { cookies } from 'next/headers';

export default async function getUserCoursesProgress() {
  try {
    const token = (await cookies()).get('token')?.value;

    const { url } = USER_COURSE_PROGRESS_GET();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'force-cache',
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as IProgress[], error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
