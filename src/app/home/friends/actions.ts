'use server';

import db from '@/lib/db';
import { supabase } from '@/lib/supabaseClient';

const GetPetProfile = async (type: string) => {
  const pets = await db.pet.findMany({
    where: { type },
    select: {
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
        },
      },
      imageUrl: true,
    },
  });

  return pets;
};

export default GetPetProfile;
