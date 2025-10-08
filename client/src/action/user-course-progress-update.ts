'use server';

import { cookies } from 'next/headers';

import { USER_COURSE_PROGRESS_PATCH } from '@/common/api';

import apiError from '@/common/apiError';

import getUser from './user-get';

import FetchApi from '@/common/utils/FetchApi';

interface IUpdateCourseProgress {
  courseId: string;
  lessonId: string;
}

export default async function updateUserCourseProgress({
  courseId,
  lessonId,
}: IUpdateCourseProgress) {
  try {
    const token = (await cookies()).get('token')?.value;

    const { url } = USER_COURSE_PROGRESS_PATCH(courseId);
    await FetchApi.patch(url, {
      body: { lessonId },
      token,
    });

    const { data: newUserData } = await getUser();

    return { data: newUserData, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
