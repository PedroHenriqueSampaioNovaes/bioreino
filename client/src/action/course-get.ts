'use server';

import { cookies } from 'next/headers';

import { COURSE_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { ICourse, ICourseGet } from '@/common/@types/course';

import FetchApi from '@/common/utils/FetchApi';

export default async function getCourse({ slug }: ICourseGet) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    const { url } = COURSE_GET({ slug });
    const data = await FetchApi.get<ICourse>(url, {
      token,
      cache: 'force-cache',
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
