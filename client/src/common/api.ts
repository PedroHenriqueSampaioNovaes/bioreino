import { ICategoryGet } from './@types/category';
import { ICourseGet, IListCourseGet } from './@types/course';
import {
  ILessonGet,
  IListLessonGet,
  IVideoLessonDetailsGet,
} from './@types/lesson';

const BASE_URL = `${process.env.NEXT_PUBLIC_API}/api`;

export function LOGIN() {
  return { url: BASE_URL + '/user/session' };
}

export function USER_CREATE() {
  return { url: BASE_URL + '/user' };
}

export function USER_TEMPORARY_CREATE() {
  return { url: BASE_URL + '/user/temporary' };
}

export function USER_GET() {
  return { url: BASE_URL + '/user/me' };
}

export function USER_UPDATE() {
  return { url: BASE_URL + '/user' };
}

export function USER_COURSE_PROGRESS_GET() {
  return { url: BASE_URL + '/course_progress' };
}

export function USER_COURSE_PROGRESS_PATCH(courseId: string) {
  return { url: BASE_URL + `/course_progress/${courseId}` };
}

export function FORGOT_PASSWORD() {
  return { url: BASE_URL + '/user/forgot_password' };
}

export function RESET_PASSWORD() {
  return { url: BASE_URL + '/user/reset_password' };
}

export function COURSES_GET({ limit, hasLessonFree, planId }: IListCourseGet) {
  return {
    url:
      BASE_URL +
      `/courses/?limit=${limit}&hasLessonFree=${hasLessonFree}&planId=${planId}`,
  };
}

export function COURSE_GET({ slug }: ICourseGet) {
  return {
    url: BASE_URL + `/courses/slug/${slug}`,
  };
}

export function LESSONS_GET({ course_id }: IListLessonGet) {
  return {
    url: BASE_URL + `/lessons/?course_id=${course_id}`,
  };
}

export function LESSON_GET({ slug }: ILessonGet) {
  return {
    url: BASE_URL + `/lessons/slug/${slug}`,
  };
}

export function VIDEO_LESSON_INFO_GET({ lessonId }: IVideoLessonDetailsGet) {
  return {
    url: BASE_URL + `/lessons/${lessonId}/video`,
  };
}

export function SUBSCRIPTIONS_GET() {
  return {
    url: BASE_URL + `/subscriptions`,
  };
}

export function CATEGORIES_GET({ planId }: ICategoryGet) {
  return {
    url: BASE_URL + `/categories/?plan_id=${planId}`,
  };
}
