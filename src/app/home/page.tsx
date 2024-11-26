'use client';

import { petAtom } from '@/state/petState';
import { useRecoilValue } from 'recoil';

const HomePage = () => {
  const pet = useRecoilValue(petAtom);

  return (
    <>
      <h1>안녕하세요 {pet.petName}</h1>
    </>
  );
};

export default HomePage;
