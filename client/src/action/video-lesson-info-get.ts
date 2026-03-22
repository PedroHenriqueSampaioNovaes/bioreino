'use server';

import { VIDEO_LESSON_INFO_GET } from '@/common/api';
import apiError from '@/common/apiError';

import {
  ILessonVideoData,
  IVideoLessonDetailsGet,
} from '@/common/@types/lesson';

import FetchApi from '@/common/utils/FetchApi';
import { cookies } from 'next/headers';

export default async function getVideoLessonInfo({
  lessonId,
}: IVideoLessonDetailsGet) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    const { url } = VIDEO_LESSON_INFO_GET({ lessonId });
    const data = await FetchApi.get<ILessonVideoData>(url, {
      init: {
        cache: 'force-cache',
        next: { revalidate: 60 * 60 * 24 * 7 },
      },
      token,
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
