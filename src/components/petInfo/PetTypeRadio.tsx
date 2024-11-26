// components/PetTypeRadio.tsx
import React from 'react';

interface IPetTypeRadioProps {
  petType: '댕이' | '냥이';
  onPetTypeChange: (type: '댕이' | '냥이') => void;
}

const PetTypeRadio = ({ petType, onPetTypeChange }: IPetTypeRadioProps) => {
  return (
    <div className="flex justify-center items-center gap-6 mb-6">
      <label className="flex items-center">
        <input
          type="radio"
          checked={petType === '댕이'}
          name="pet"
          value="댕이"
          className="mr-2"
          onChange={() => onPetTypeChange('댕이')}
        />
        댕이
      </label>
      <label className="flex items-center">
        <input
          type="radio"
          checked={petType === '냥이'}
          name="pet"
          value="냥이"
          className="mr-2"
          onChange={() => onPetTypeChange('냥이')}
        />
        냥이
      </label>
    </div>
  );
};

export default PetTypeRadio;
