'use client';

import { useState, useEffect } from 'react';
import Banner from '@/components/friends/Banner';
import PetSelector from '@/components/friends/PetSelector';
import PetFriends from '@/components/friends/PetFriends';
import GetPetProfile from '@/app/home/friends/actions';
import { useRecoilState } from 'recoil';
import { petFriendAtom } from '@/state/petFriend';

export type PetType = {
  imageUrl: string | null;
  name: string;
  type: string;
  age: string;
  category: string;
  breed: string | null;
  gender: string | null;
  neutered: string | null;
  otherBreed: string | null;
  traits: string[];
  reason: string | null;
  user: {
    username: string | null;
  };
};

const Friends = () => {
  const [selectedPet, setSelectedPet] = useState('댕이');
  const [petFriends, setPetFriends] = useRecoilState(petFriendAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      const petsData = await GetPetProfile(selectedPet);
      setPetFriends(petsData);
      setLoading(false);
    };

    fetchPets();
  }, [selectedPet]);

  return (
    <div className="flex flex-col justify-center items-center text-center gap-2 ">
      <Banner />
      <PetSelector initialSelected={selectedPet} setSelected={setSelectedPet} />
      {loading ? <div>로딩 중...</div> : <PetFriends pets={petFriends} />}
    </div>
  );
};

export default Friends;
