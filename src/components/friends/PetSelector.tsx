'use client';

import { useState } from 'react';
import Image from 'next/image';
import cat from '../../asserts/friends/cat.png';
import dog from '../../asserts/friends/dog.png';

interface IPetSelectorProps {
  initialSelected: string;
  setSelected: (selected: string) => void; // 함수 타입 변경
}

const PetSelector = ({ initialSelected, setSelected }: IPetSelectorProps) => {
  const [selected, setSelectedState] = useState(initialSelected);

  const handleSelection = (petType: string) => {
    setSelectedState(petType);
    setSelected(petType);
  };

  return (
    <div className="flex flex-row w-[190px] border border-darkPink rounded-2xl overflow-hidden my-2 ">
      <button
        onClick={() => handleSelection('댕이')}
        className={`flex flex-row justify-center items-center px-3 py-2 transition-colors ease-in-out border-r border-darkPink flex-1 ${
          selected === '댕이' ? 'bg-darkPink text-white' : ''
        }`}>
        <Image src={dog} alt="강아지" width={24} className="mr-2" />
        <span className="text-sm">댕친구</span>
      </button>

      <button
        onClick={() => handleSelection('냥이')}
        className={`flex flex-row justify-center items-center px-3 py-2 transition-colors ease-in-out flex-1 ${
          selected === '냥이' ? 'bg-darkPink text-white' : ''
        }`}>
        <Image src={cat} alt="고양이" width={24} className="mr-2" />
        <span className="text-sm">냥친구</span>
      </button>
    </div>
  );
};

export default PetSelector;
