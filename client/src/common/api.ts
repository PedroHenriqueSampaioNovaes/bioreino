import { ICategoryGet } from './@types/category';
import { ICourseGet, IListCourseGet } from './@types/course';

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api`;

export function LOGIN() {
  return { url: BASE_URL + '/user/session' };
}

export function USER_GET() {
  return { url: BASE_URL + '/user/me' };
}

export function USER_COURSE_PROGRESS_GET() {
  return { url: BASE_URL + '/course_progress' };
}

export function FORGOT_PASSWORD() {
  return { url: BASE_URL + '/user/forgot_password' };
}

export function RESET_PASSWORD() {
  return { url: BASE_URL + '/user/reset_password' };
}

export function COURSES_GET({ limit, free, planId }: IListCourseGet) {
  return {
    url: BASE_URL + `/courses/?limit=${limit}&free=${free}&plan_id=${planId}`,
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
