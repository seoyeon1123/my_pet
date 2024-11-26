// components/DogInfo.tsx
import React from 'react';
import Input from '@/components/shared/Input';
import { useRecoilState } from 'recoil';
import DogBreedSelect from '@/components/petInfo/DogSelect';
import { petAtom } from '@/state/petState';

const DogInfo = () => {
  const [pet, setPet] = useRecoilState(petAtom);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-6 mb-6">
      <Input
        name="petName"
        type="text"
        placeholder="반려동물 이름"
        value={pet.petName}
        onChange={handleInputChange}
      />
      <Input
        name="petAge"
        type="text"
        placeholder="반려동물 나이"
        value={pet.petAge}
        onChange={handleInputChange}
      />

      <div className="p-2 flex flex-row gap-2">
        <select
          name="petGender"
          className="p-2 w-full rounded-xl focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink"
          value={pet.petGender}
          onChange={handleSelectChange}
        >
          <option value="">댕이 성별 선택</option>
          <option value="여자">여자</option>
          <option value="남자">남자</option>
        </select>

        <select
          name="petNeutered"
          className="p-2 w-full rounded-xl focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink"
          value={pet.petNeutered}
          onChange={handleSelectChange}
        >
          <option value="">댕이 중성화</option>
          <option value="o">🅾️</option>
          <option value="x">❎</option>
        </select>
      </div>

      <hr className="border border-dashed border-neutral-200" />

      <DogBreedSelect />
    </div>
  );
};

export default DogInfo;
