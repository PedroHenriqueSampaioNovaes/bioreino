'use server';

import { COURSES_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { ICourse, IListCourseGet } from '@/common/@types/course';

export default async function getCourses({
  free,
  limit,
  planId,
}: IListCourseGet = {}) {
  try {
    const { url } = COURSES_GET({ free, limit, planId });
    const response = await fetch(url, { cache: 'force-cache' });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as ICourse[], error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
