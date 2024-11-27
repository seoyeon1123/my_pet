import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    isExistingUser?: boolean;
  }

  interface Session {
    user: {
      isExistingUser?: boolean;
    } & DefaultUser;
  }
}
