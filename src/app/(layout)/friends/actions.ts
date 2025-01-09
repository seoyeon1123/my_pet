'use server';

import db from '@/lib/db';

const GetPetProfile = async (type: string) => {
  const pets = await db.pet.findMany({
    where: { type },
    select: {
      id: true,
      name: true,
      type: true,
      age: true,
      category: true,
      breed: true,
      gender: true,
      neutered: true,
      otherBreed: true,
      traits: true,
      reason: true,
      user: {
        select: {
          username: true,
          name: true,
        },
      },
      imageUrl: true,
    },
  });

  return pets;
};

export default GetPetProfile;
