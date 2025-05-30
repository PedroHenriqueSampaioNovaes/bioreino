import { ICourseGet } from "./@types/course";

const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api`;

export function LOGIN() {
  return { url: BASE_URL + '/user/session' };
}

export function USER_GET() {
  return { url: BASE_URL + '/user/me' };
}

export function FORGOT_PASSWORD() {
  return { url: BASE_URL + '/user/forgot_password' };
}

export function RESET_PASSWORD() {
  return { url: BASE_URL + '/user/reset_password' };
}

export function COURSES_GET({ limit, free, planId }: ICourseGet) {
  return {
    url: BASE_URL + `/courses/?limit=${limit}&free=${free}&planId=${planId}`,
  };
}
