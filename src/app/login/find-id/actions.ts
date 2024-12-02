'use server';

import db from '@/lib/db';

const FindIdAction = async (name: string, email: string) => {
  const findUser = await db.user.findFirst({
    where: { name },
    select: { email: true, username: true },
  });

  if (findUser?.email === email) {
    return findUser.username;
  }
  return null;
};

export default FindIdAction;
