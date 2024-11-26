'use server';

import db from '@/lib/db';

const getPet = async (userId: number) => {
  const pet = await db.pet.findFirst({
    where: {
      userId: userId,
    },
    select: {
      name: true,
    },
  });
  return pet;
};

export default getPet;
