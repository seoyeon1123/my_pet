import getSession from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

interface IRoutes {
  [key: string]: boolean;
}

const publicOnlyUrl: IRoutes = {
  '/': true,
  '/signup': true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicRoute = publicOnlyUrl[request.nextUrl.pathname];

  if (session?.id) {
    // 세션이 있는 경우: publicOnlyUrl에 접근하려 하면 /home으로 리디렉션
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else {
    // 세션이 없는 경우: publicOnlyUrl 외의 URL에 접근하려 하면 /로 리디렉션
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 기본적으로 요청을 허용
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 설정
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
