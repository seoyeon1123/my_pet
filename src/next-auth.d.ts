// next-auth.d.ts
import NextAuth, { DefaultUser } from 'next-auth';

// next-auth의 User 타입 확장
declare module 'next-auth' {
  interface User extends DefaultUser {
    isExistingUser?: boolean; // 여기서 isExistingUser 추가
  }

  // session의 user에 isExistingUser 속성 추가
  interface Session {
    user: {
      isExistingUser?: boolean; // session에도 isExistingUser 추가
    } & DefaultUser;
  }
}
