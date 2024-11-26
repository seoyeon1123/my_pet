'use server';

import db from '@/lib/db'; // Prisma 클라이언트
import { z } from 'zod'; // Zod 라이브러리
import bcrypt from 'bcryptjs';
import getSession from '@/lib/session';

const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().regex(/^\d{10,11}$/, '유효한 전화번호를 입력해주세요.'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  username: z.string().min(3, '아이디는 3자 이상이어야 합니다.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

export type SignupData = z.infer<typeof signupSchema>;

// 회원가입 처리 함수 (async)
export async function createUser(data: SignupData) {
  const validatedData = signupSchema.parse(data);

  const existingUser = await db.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (existingUser) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  const user = await db.user.create({
    data: {
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email,
      username: validatedData.username,
      password: hashedPassword,
    },
  });

  const userSession = await getSession();
  if (userSession) {
    userSession.id = user.id;
    await userSession.save(); // 세션 저장
    console.log(userSession.id);
  }

  return user;
}
