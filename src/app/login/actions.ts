'use server';

import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

const loginAction = async (username: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      password: true,
    },
  });

  if (!user) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password!);

  if (!isPasswordValid) {
    throw new Error('비밀번호가 일치하지 않습니다.');
  }
};

export default loginAction;
