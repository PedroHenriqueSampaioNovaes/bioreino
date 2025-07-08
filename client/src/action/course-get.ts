'use server';

import { cookies } from 'next/headers';

import { COURSE_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { ICourse, ICourseGet } from '@/common/@types/course';

export default async function getCourse({ slug }: ICourseGet) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    const { url } = COURSE_GET({ slug });
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'force-cache',
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as ICourse, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
