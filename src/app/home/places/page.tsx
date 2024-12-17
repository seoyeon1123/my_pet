'use client';

import PlacesBanner from '@/components/places/Banner';
import Kakao from '@/components/places/Kakaomap';
import PetFriendlyPlace from '@/components/places/PetFriendlyPlace';
import { placeState } from '@/state/PlaceState';
import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

const Places = () => {
  const setPlace = useSetRecoilState(placeState);
  const place = useRecoilValue(placeState); // place 상태 값을 가져옴

  useEffect(() => {
    setPlace({
      id: '',
      name: '',
      address: '',
      category: '',
      phone: '',
      placeUrl: '',
      latitude: 0,
      longitude: 0,
    });
  }, [setPlace]); // 빈 배열을 넣어주면 컴포넌트가 처음 렌더링될 때만 실행됩니다.

  // placeState가 초기화된 상태인지 확인하고 렌더링 여부를 결정
  if (!place || !place.id) {
    return (
      <div className="flex flex-col justify-center items-center gap-5 mb-10">
        <PlacesBanner />
        <Kakao />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-5 mb-10">
      <PlacesBanner />
      <Kakao />
      <PetFriendlyPlace />
    </div>
  );
};

export default Places;
