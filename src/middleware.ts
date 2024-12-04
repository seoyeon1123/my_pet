import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl.clone();

  if (token) {
    if (url.pathname === '/login' || url.pathname === '/signup' || url.pathname === '/') {
      url.pathname = '/home';
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname !== '/' && url.pathname !== '/login' && url.pathname !== '/signup') {
      url.pathname = '/login'; // 로그인하지 않은 경우 /login으로 리다이렉트
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/home', '/dashboard'],
};
