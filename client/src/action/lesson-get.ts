'use server';

import { LESSON_GET } from '@/common/api';
import apiError from '@/common/apiError';

import { ILesson, ILessonGet } from '@/common/@types/lesson';

import FetchApi from '@/common/utils/FetchApi';

export default async function getLesson({ slug }: ILessonGet) {
  try {
    const { url } = LESSON_GET({ slug });
    const data = await FetchApi.get<ILesson>(url, {
      init: { cache: 'force-cache', next: { revalidate: 60 * 60 * 24 * 7 } },
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
