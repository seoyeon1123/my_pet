'use client';

import PlacesBanner from '@/components/places/Banner';
import Kakao from '@/components/places/Kakaomap';
import PetFriendlyPlace from '@/components/places/PetFriendlyPlace';
import { placeState } from '@/state/PlaceState';
import React, { useEffect } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';

const Places = () => {
  const setPlace = useSetRecoilState(placeState);
  const place = useRecoilValue(placeState);

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
  }, [setPlace]);

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
