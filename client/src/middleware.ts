import { NextResponse, NextRequest } from 'next/server';

import { verifyToken } from './common/utils/verifyToken';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAuthenticated = token ? verifyToken(token) : false;

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login/:path*', '/dashboard/:path*'],
};
