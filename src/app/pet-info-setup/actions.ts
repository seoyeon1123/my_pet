// PetState 타입 정의
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

('use server');

import db from '@/lib/db';

// PetInfoActions 함수의 매개변수 타입을 PetState로 변경
const PetInfoActions = async (petState: PetState, username: string) => {
  console.log('PetInfoActions 함수가 호출되었습니다.');
  console.log('username:', username);
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
    username: username,
  };

  // 필수 항목 체크
  if (!data.name || !data.type || !data.age || !data.breed || !data.gender) {
    throw new Error('모든 필드를 입력해주세요.');
  }

  // 사용자 정보 조회
  const user = await db.user.findUnique({
    where: {
      username: data.username,
    },
    select: {
      id: true,
    },
  });

  // user가 존재하는지 확인하고, 안전하게 user.id 사용
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
