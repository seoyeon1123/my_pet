'use client';

import cat1 from '../../asserts/main/cat1.png';
import cat2 from '../../asserts/main/cat2.png';
import cat3 from '../../asserts/main/cat3.png';
import dog1 from '../../asserts/main/dog1.png';
import dog2 from '../../asserts/main/dog2.png';

import React from 'react';
import MainCard from './MainCard';

const cardData = [
  {
    imageSrc: cat1,
    title: '댕냥친구소',
    description: '강아지부터 고양이까지, 다양한 친구를 만나보세요!',
    altText: '친구 찾기',
  },
  {
    imageSrc: cat2,
    title: '댕냥광장',
    description: '견주들과 교류하고 반려동물에 대한 유익한 정보를 나누세요.',
    altText: '커뮤니티',
  },
  {
    imageSrc: cat3,
    title: '댕냥터',
    description: '내 근처에 있는 [ 댕냥이들을 위한 ] 카페, 병원, 호텔 등을 찾아보아요.',
    altText: '지도',
  },
  {
    imageSrc: dog1,
    title: '댕냥창고',
    description: '다양한 물품을 공동구매로 절약해보아요.',
    altText: '스토어',
  },
  {
    imageSrc: dog2,
    title: '댕냥챗',
    description: '공동구매가 성공적으로 진행되면, 참여자들과 실시간 채팅을 통해 소통할 수 있어요.',
    altText: '채팅',
  },
];

const MainComponent = () => {
  return (
    <div className="xs:pt-24 sm:pt-24 p-5 bg-lightPinkbg min-h-screen flex flex-col items-center justify-center gap-10 w-full">
      <div className="text-center flex flex-col gap-10">
        <h1 className="text-4xl text-black font-bold xs:text-2xl sm:text-2xl">
          견주와 견주, 애완견과 애완견을 연결해주는 소통 파트너
        </h1>
        <div className="xs:text-sm sm:text-sm *:text-gray-500 font-semibold">
          <p>우리 아이를 잘 키우고 싶은 마음, 외롭지 않게 키우고 싶은 마음</p>
          <p>댕냥살롱은 다 알아서, 준비했어요</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 items-center justify-center">
        {cardData.map((card, index) => (
          <MainCard
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
            altText={card.altText}
          />
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
