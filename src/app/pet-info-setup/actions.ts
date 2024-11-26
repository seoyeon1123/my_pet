import db from '@/lib/db';

const PetInfoActions = async (
  prevState: any,
  formData: FormData,
  userId: number
) => {
  const data = {
    name: formData.get('petName') as string | null,
    type: formData.get('petType') as string | null,
    age: formData.get('petAge') as string | null,
    breed: formData.get('petBreed') as string | null,
    gender: formData.get('petGender') as string | null,
    category: formData.get('petCategory') as string,
    neutered: formData.get('petNeutered') as string | null,
    otherBreed: formData.get('petOtherBreed') as string | null,
  };

  if (!data.name || !data.type || !data.age || !data.breed || !data.gender) {
    throw new Error('모든 필드를 입력해주세요.');
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
      otherBreed: data.otherBreed || '',
      userId: userId,
    },
  });

  return result;
};

export default PetInfoActions;
