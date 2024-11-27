import db from '@/lib/db';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: '이메일',
          type: 'text',
          placeholder: '이메일 주소 입력 요망',
        },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null; // 로그인 실패 시 null 반환
        }
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile) {
        const user = await db.user.findUnique({
          where: {
            email: profile.kakao_account.email,
          },
        });

        if (!user) {
          const newUser = await db.user.create({
            data: {
              email: profile.kakao_account.email,
              name: profile.properties?.nickname,
            },
          });

          return {
            id: newUser.id.toString(),
            name: newUser.name,
            email: newUser.email,
            username: newUser.username || null,
            password: null, // 비밀번호는 저장하지 않음
            phone: newUser.phone || null,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            isExistingUser: false, // 신규 사용자
          };
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          username: user.username || null,
          password: null,
          phone: user.phone || null,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          isExistingUser: true, // 기존 사용자
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.isExistingUser = user.isExistingUser;
      }
      return token;
    },

    async session({ session, token }) {
      // session에 token 값을 병합
      session.user = { ...session.user, ...token }; // token 정보 병합
      return session;
    },

    async redirect({ url, baseUrl }) {
      return `${baseUrl}/home`;
    },
  },

  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };
