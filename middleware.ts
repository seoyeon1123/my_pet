import getSession from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface IRoutes {
  [key: string]: boolean;
}

// publicOnlyUrl 정의: 세션이 없으면 접근할 수 있는 URL들
const publicOnlyUrl: IRoutes = {
  '/': true,
  '/signup': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicRoute = publicOnlyUrl[request.nextUrl.pathname];

  if (session?.id) {
    // 세션이 있을 경우, publicOnlyUrl에 포함된 페이지로 접근하면 /home으로 리디렉션
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else {
    // 세션이 없을 경우, publicOnlyUrl에 포함되지 않은 페이지로 접근하면 /로 리디렉션
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next(); // 기본 응답을 리턴하여 요청을 진행
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
