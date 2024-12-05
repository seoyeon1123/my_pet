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

const PetInfoActions = async (petState: PetState, id: string) => {
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
    personId: id,
    imageUrl: petState.petImage,
  };

  if (!data.name || !data.type || !data.age || !data.gender || !data.category || !data.imageUrl) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  const personId = Number(data.personId);

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
      userId: personId,
      imageUrl: data.imageUrl,
    },
  });

  return result;
};

export default PetInfoActions;
