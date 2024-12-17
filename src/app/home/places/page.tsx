'use client';

import PlacesBanner from '@/components/places/Banner';
import Kakao from '@/components/places/Kakaomap';
import React from 'react';

const Places = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 mb-10">
      <PlacesBanner />
      <Kakao />
    </div>
  );
};

export default Places;
