'use server';

import { USER_COURSE_PROGRESS_GET } from '@/common/api';

import apiError from '@/common/apiError';

import { IUserCourseProgress } from '@/common/@types/user-course-progress';

import { cookies } from 'next/headers';

export default async function getUserCourseProgress() {
  try {
    const token = (await cookies()).get('token')?.value;

    const { url } = USER_COURSE_PROGRESS_GET();
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    return { data: data as IUserCourseProgress[], error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
