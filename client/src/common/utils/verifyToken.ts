import * as jose from 'jose';

export function verifyToken(token: string): boolean {
  try {
    jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SALT), {
      algorithms: ['HS256'],
    });

    return true;
  } catch {
    return false;
  }
}
