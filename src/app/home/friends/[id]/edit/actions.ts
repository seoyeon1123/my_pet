'use server';
import db from '@/lib/db';

interface PetState {
  petName: string;
  petType: string;
  petAge: string;
  petBreed: string;
  petGender: string;
  category: string;
  petNeutered: string;
  petOtherBreed?: string;
  petTraits: string[];
  petReson: string;
  petImage: string;
}

const PetInfoUpdate = async (petState: PetState, username: string) => {
  const data = {
    name: petState.petName,
    type: petState.petType,
    age: petState.petAge,
    breed: petState.petBreed || '',
    gender: petState.petGender,
    category: petState.category,
    neutered: petState.petNeutered,
    traits: petState.petTraits,
    reason: petState.petReson,
    otherBreed: petState.petOtherBreed || '',
    username: username,
    imageUrl: petState.petImage,
  };

  if (!data.name || !data.type || !data.age || !data.gender || !data.category || !data.imageUrl) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  // Ensure the username is provided
  console.log('Username:', data.username);

  // Using findFirst to get a single user by username
  const user = await db.user.findFirst({
    where: {
      name: data.username, // Searching by username
    },
    select: {
      id: true,
    },
  });

  if (!user?.id) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  const result = await db.pet.updateMany({
    where: {
      name: data.name!, // Update pet by its name (ensure the name exists in the database)
    },
    data: {
      name: data.name,
      type: data.type,
      age: data.age,
      breed: data.breed,
      gender: data.gender,
      category: data.category,
      neutered: data.neutered,
      otherBreed: data.otherBreed,
      traits: data.traits,
      reason: data.reason,
      userId: user.id, // Link to the correct user by id
      imageUrl: data.imageUrl,
    },
  });

  return result;
};

export default PetInfoUpdate;
