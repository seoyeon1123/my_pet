'use server';

import db from '@/lib/db';
import bcrypt from 'bcryptjs';

const FindPasswordActions = async (username: string, email: string) => {
  const user = await db.user.findFirst({
    where: {
      username,
    },
    select: {
      email: true,
    },
  });
  if (user?.email === email) {
    return user;
  }
};

export const EditPassword = async (username: string, password: string) => {
  console.log('hashed 전 password', password);
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('Hashed password:', hashedPassword);
  const updatedUser = await db.user.update({
    where: {
      username,
    },
    data: {
      password: hashedPassword,
    },
  });

  return updatedUser;
};
export default FindPasswordActions;
