'use server';

import { LESSONS_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { ILesson, IListLessonGet } from '@/common/@types/lesson';

import FetchApi from '@/common/utils/FetchApi';

export default async function getLessons({ course_id }: IListLessonGet = {}) {
  try {
    const { url } = LESSONS_GET({ course_id });

    const data = await FetchApi.get<ILesson[]>(url, {
      init: { cache: 'force-cache', next: { revalidate: 60 * 60 * 24 } },
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
