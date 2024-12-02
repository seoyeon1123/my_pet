import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // JWT 토큰 가져오기
  const token = await getToken({ req });

  const url = req.nextUrl.clone();

  // 로그인한 경우
  if (token) {
    // 이미 로그인한 경우, 로그인 페이지 또는 가입 페이지에 접근하면 /home으로 리다이렉트
    if (url.pathname === '/login' || url.pathname === '/signup') {
      url.pathname = '/home'; // /home으로 리다이렉트
      return NextResponse.redirect(url);
    }
  } else {
    // 로그인하지 않은 경우, /login 또는 /signup을 제외한 다른 페이지에 접근하면 /login으로 리다이렉트
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
