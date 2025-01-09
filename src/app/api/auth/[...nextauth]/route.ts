// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import db from '@/lib/db'; // Prisma DB 연결

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      async profile(profile) {
        const email = profile.kakao_account?.email;

        if (!email) {
          throw new Error('카카오에서 이메일 정보를 가져오지 못했습니다.');
        }

        let user = await db.user.findFirst({
          where: { email },
        });

        if (!user) {
          const tempPassword = Date.now().toString(); // 임시 비밀번호
          const hashedPassword = await bcrypt.hash(tempPassword, 10); // bcrypt로 암호화

          user = await db.user.create({
            data: {
              email,
              name: profile.properties?.nickname || 'Unknown',
              username: profile.properties?.nickname || 'Unknown',
              password: hashedPassword,
            },
          });
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
          isExistingUser: Boolean(user.createdAt),
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error('Username과 Password를 모두 입력해주세요.');
        }

        const { username, password } = credentials;

        if (!username || !password) {
          throw new Error('Username과 Password를 모두 입력해주세요.');
        }

        const user = await db.user.findUnique({
          where: { username },
          select: {
            password: true,
            id: true,
            name: true,
            email: true,
            username: true,
            phone: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        const trimmedPassword = password.trim();

        const isPasswordValid = await bcrypt.compare(trimmedPassword, user!.password!);

        if (isPasswordValid && user) {
          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            username: user.username,
            phone: user.phone,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          };
        }

        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.isExistingUser = user.isExistingUser as boolean;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        isExistingUser: token.isExistingUser as boolean,
        name: session.user?.name || null,
      };
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url === baseUrl) {
        return `${baseUrl}/friends`;
      }
      return url;
    },
  },

  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };
