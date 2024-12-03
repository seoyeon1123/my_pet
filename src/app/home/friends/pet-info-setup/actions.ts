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

const PetInfoActions = async (petState: PetState, personname: string) => {
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
    personname: personname,
    imageUrl: petState.petImage,
  };

  console.log(
    'name',
    data.name,
    'type',
    data.type,
    'age',
    data.age,
    'breed',
    data.breed,
    'gender',
    data.gender,
    'neutered',
    data.neutered,
    'otherBreed',
    data.otherBreed,
    'category',
    data.category,
    'traits',
    data.traits,
    'reason',
    data.reason,
    'imageUrl',
    data.imageUrl,
  );

  if (!data.name || !data.type || !data.age || !data.gender || !data.category || !data.imageUrl) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  const user = await db.user.findFirst({
    where: {
      name: data.personname,
    },
    select: {
      id: true,
    },
  });

  if (!user?.id) {
    throw new Error('사용자를 찾을 수 없습니다.');
  }

  const result = await db.pet.create({
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
      userId: user.id,
      imageUrl: data.imageUrl,
    },
  });

  return result;
};

export default PetInfoActions;
