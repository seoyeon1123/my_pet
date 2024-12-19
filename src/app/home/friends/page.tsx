'use client';

import { useState, useEffect } from 'react';
import Banner from '@/components/friends/Banner';
import PetSelector from '@/components/friends/PetSelector';
import PetFriends from '@/components/friends/PetFriends';
import GetPetProfile from '@/app/home/friends/actions';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { petFriendAtom } from '@/state/petFriend';

const Friends = () => {
  const [selectedPet, setSelectedPet] = useState('댕이');
  const [petFriends, setPetFriends] = useRecoilState(petFriendAtom);

  const { data, isLoading, isError } = useQuery(['pets', selectedPet], () => GetPetProfile(selectedPet), {
    onSuccess: (data) => {
      setPetFriends(data);
    },
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 가져오는 데 실패했습니다.</div>;

  return (
    <div className="flex flex-col justify-center items-center text-center gap-2 ">
      <Banner />
      <PetSelector initialSelected={selectedPet} setSelected={setSelectedPet} />
      <PetFriends pets={petFriends} />
    </div>
  );
};

export default Friends;
