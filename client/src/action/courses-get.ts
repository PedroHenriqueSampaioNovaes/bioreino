'use server';

import { COURSES_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { ICourse, IListCourseGet } from '@/common/@types/course';

import FetchApi from '@/common/utils/FetchApi';

export default async function getCourses({
  free,
  limit,
  planId,
}: IListCourseGet = {}) {
  try {
    const { url } = COURSES_GET({ free, limit, planId });

    const data = await FetchApi.get<ICourse[]>(url, {
      init: { cache: 'force-cache' },
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
