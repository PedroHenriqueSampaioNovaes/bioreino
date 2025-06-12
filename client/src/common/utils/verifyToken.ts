import * as jose from 'jose';

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SALT),
      {
        algorithms: ['HS256'],
      }
    );

    return true;
  } catch {
    return false;
  }
}
