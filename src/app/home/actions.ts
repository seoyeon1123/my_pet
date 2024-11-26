'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';

const getPet = async () => {
  const user = await getSession();
  const pet = await db.pet.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      name: true,
    },
  });
  return pet;
};

export default getPet;
