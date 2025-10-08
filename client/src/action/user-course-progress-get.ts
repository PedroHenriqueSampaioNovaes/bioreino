'use server';

import { USER_COURSE_PROGRESS_GET } from '@/common/api';

import apiError from '@/common/apiError';

import { IUserCourseProgress } from '@/common/@types/user-course-progress';

import FetchApi from '@/common/utils/FetchApi';

import { cookies } from 'next/headers';

export default async function getUserCourseProgress() {
  try {
    const token = (await cookies()).get('token')?.value;

    const { url } = USER_COURSE_PROGRESS_GET();

    const data = await FetchApi.get<IUserCourseProgress[]>(url, {
      token,
    });

    return { data, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
