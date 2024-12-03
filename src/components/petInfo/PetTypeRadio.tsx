import { petAtom } from '@/state/petState';
import React from 'react';
import { useRecoilState } from 'recoil';

const PetTypeRadio = () => {
  const [petState, setPetState] = useRecoilState(petAtom);

  const handlePetTypeChange = (type: '댕이' | '냥이') => {
    setPetState((prevState) => ({
      ...prevState,
      petType: type,
    }));
  };

  return (
    <div className="flex justify-center items-center gap-6 ">
      <label className="flex items-center">
        <input
          type="radio"
          checked={petState.petType === '댕이'}
          name="pet"
          value="댕이"
          className="mr-2"
          onChange={() => handlePetTypeChange('댕이')}
        />
        댕이
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          checked={petState.petType === '냥이'}
          name="pet"
          value="냥이"
          className="mr-2"
          onChange={() => handlePetTypeChange('냥이')}
        />
        냥이
      </label>
    </div>
  );
};

export default PetTypeRadio;
