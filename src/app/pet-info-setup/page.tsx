'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DogInfo from '@/components/petInfo/DogInfo';
import CatInfo from '@/components/petInfo/CatInfo';
import PetTypeRadio from '@/components/petInfo/PetTypeRadio';

const PetInfoSetup = () => {
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petType, setPetType] = useState<'댕이' | '냥이'>('댕이');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handlePetTypeChange = (type: '댕이' | '냥이') => {
    setPetType(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!petName || !petAge || !petType) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    alert('반려동물 정보가 설정되었습니다.');
    router.push('/home');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-lightPinkbg p-5">
      <form
        className="flex flex-col gap-6 lg:w-1/3 xl:w-1/3 p-6"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-darkPink py-4 font-hakgyo">
          댕냥살롱
        </h1>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-xl font-bold">
            우리 댕냥이에 대해서 알려주세요!
          </h2>
          <p className="text-gray-600">
            만약, 예비견주라면 여기를 클릭해주세요 :)
          </p>
        </div>
        <PetTypeRadio petType={petType} onPetTypeChange={handlePetTypeChange} />

        {petType === '댕이' ? <DogInfo /> : <CatInfo />}

        <div className="flex justify-between gap-4">
          <button
            className="w-1/3 flex items-center justify-center bg-lightPink rounded-l-xl py-2"
            type="button"
            onClick={() => router.back()}
          >
            이전
          </button>
          <button
            className="w-2/3 flex items-center justify-center bg-darkPink text-white rounded-r-xl py-2"
            type="submit"
          >
            완료
          </button>
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </form>
    </div>
  );
};

export default PetInfoSetup;
