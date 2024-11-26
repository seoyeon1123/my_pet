'use server';

import db from '@/lib/db'; // Prisma 클라이언트
import { z } from 'zod'; // Zod 라이브러리
import bcrypt from 'bcryptjs';

// 회원가입 데이터 검증 스키마 (직접 내보내지 않음)
const signupSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().regex(/^\d{10,11}$/, '유효한 전화번호를 입력해주세요.'),
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
  username: z.string().min(3, '아이디는 3자 이상이어야 합니다.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});

// 타입 추론 (파일에서만 사용)
export type SignupData = z.infer<typeof signupSchema>;

// 회원가입 처리 함수 (async)
export async function createUser(data: SignupData) {
  // 1. 데이터 검증
  const validatedData = signupSchema.parse(data);

  // 2. 이미 존재하는 이메일 또는 사용자명 체크 (중복 확인)
  const existingUser = await db.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (existingUser) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  // 4. Prisma를 사용하여 사용자 데이터 저장
  const user = await db.user.create({
    data: {
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email,
      username: validatedData.username,
      password: hashedPassword,
    },
  });

  return user;
}
