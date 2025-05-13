const BASE_URL = `${process.env.NEXT_PUBLIC_URL}/api`;

export function LOGIN() {
  return { url: BASE_URL + '/user/session' };
}

export function USER_GET() {
  return { url: BASE_URL + '/user/me' };
}
