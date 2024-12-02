// next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    isExistingUser?: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      isExistingUser: boolean;
      name?: string | null;
    } & DefaultSession['user'];
  }

  interface JWT {
    id: string;
    email: string;
    isExistingUser?: boolean;
  }
}
