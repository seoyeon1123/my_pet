'use client';

import { useState } from 'react';
import Banner from '@/components/friends/Banner';
import PetSelector from '@/components/friends/PetSelector';
import PetFriends from '@/components/friends/PetFriends';
import GetPetProfile from '@/app/(layout)/friends/actions';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { petFriendAtom } from '@/state/petFriend';
import Loading from '@/components/Loading';

const Friends = () => {
  const [selectedPet, setSelectedPet] = useState('댕이');
  const [petFriends, setPetFriends] = useRecoilState(petFriendAtom);

  const { isLoading, isError } = useQuery(['pets', selectedPet], () => GetPetProfile(selectedPet), {
    enabled: !!selectedPet,
    onSuccess: (data) => {
      setPetFriends(data);
    },
  });
  console.log(`현재 브라우저 시간대: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`);

  return (
    <div className="flex flex-col justify-start items-center text-center gap-2 min-h-screen ">
      <Banner />
      {isLoading ? (
        <div className="flex justify-center items-center ">
          <Loading />
        </div>
      ) : isError ? (
        <div>데이터를 가져오는 데 실패했습니다.</div>
      ) : (
        <>
          <PetSelector initialSelected={selectedPet} setSelected={setSelectedPet} />
          <PetFriends pets={petFriends} />
        </>
      )}
    </div>
  );
};

export default Friends;
