'use client';

import mainDog from '../../asserts/main/mainDog.png';
import React from 'react';
import MainCard from './MainCard';
const cardData = [
  {
    imageSrc: mainDog,
    title: '댕냥친구소',
    description: '강아지부터 고양이까지, 다양한 친구를 만나보세요!',
    altText: '친구 찾기',
  },
  {
    imageSrc: mainDog,
    title: '댕냥광장',
    description: '견주들과 교류하고 반려동물에 대한 유익한 정보를 나누세요.',
    altText: '커뮤니티',
  },
  {
    imageSrc: mainDog,
    title: '댕냥터',
    description:
      '내 근처에 있는 [ 댕냥이들을 위한 ] 카페, 병원, 호텔 등을 찾아보아요.',
    altText: '이벤트',
  },
  {
    imageSrc: mainDog,
    title: '댕냥창고',
    description: '다양한 댕냥이들의 용품을 찾아보아요.',
    altText: '이벤트',
  },
  {
    imageSrc: mainDog,
    title: '댕냥맘',
    description:
      '급하게 우리의 댕냥이를 맡겨야 한다면, 댕냥맘 & 댕냥대디에게 맡겨주세요.',
    altText: '이벤트',
  },
];

function MainComponent() {
  return (
    <div
      className="
     xs:pt-24 sm:pt-24
    p-5 bg-lightPinkbg min-h-screen flex flex-col items-center justify-center gap-10 w-full"
    >
      <div className="text-center flex flex-col gap-10 ">
        <h1
          className="text-4xl text-black font-bold
        xs:text-2xl sm:text-2xl
        "
        >
          견주와 견주, 애완견과 애완견을 연결해주는 소통 파트너
        </h1>
        <div
          className="
         xs:text-sm sm:text-sm
        *:text-gray-500 font-semibold"
        >
          <p>우리 아이를 잘 키우고 싶은 마음, 외롭지 않게 키우고 싶은 마음</p>
          <p>댕냥살롱은 다 알아서, 준비했어요</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-4">
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
}

export default MainComponent;
