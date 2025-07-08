'use server';

import { cookies } from 'next/headers';

import { USER_COURSE_PROGRESS_PATCH } from '@/common/api';

import apiError from '@/common/apiError';

import getUser from './user-get';

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
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ lessonId }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const { data: newUserData } = await getUser();

    return { data: newUserData, error: '', ok: true };
  } catch (error) {
    return apiError(error);
  }
}
