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
}

const PetInfoActions = async (petState: PetState, personname: string) => {
  console.log('PetInfoActions 함수가 호출되었습니다.');
  console.log('username:', personname);
  console.log('petState:', petState);

  const data = {
    name: petState.petName,
    type: petState.petType,
    age: petState.petAge,
    breed: petState.petBreed,
    gender: petState.petGender,
    category: petState.category,
    neutered: petState.petNeutered,
    otherBreed: petState.petOtherBreed || '',
    personname: personname,
  };

  // 필수 항목 체크
  if (!data.name || !data.type || !data.age || !data.breed || !data.gender) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  // 사용자 정보 조회
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
      userId: user.id,
    },
  });

  return result;
};

export default PetInfoActions;
