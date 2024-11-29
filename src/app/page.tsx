'use client';

import { useRef } from 'react';
import CommunityIntroduction from '@/components/main/MainCommunityIntroduction';
import MainComponent from '@/components/main/MainComponent';
import Image from 'next/image';
import catNdog from '../asserts/main/cat&dog.png';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (mainRef) {
      mainRef.current!.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative bg-lightPink min-h-screen text-white text-center py-20 pb-32 flex flex-col justify-center items-center w-full">
        <div className="absolute top-4 right-4 flex items-center">
          {/* 로그인 버튼 클릭 시 로그인 페이지로 이동 */}
          <Link href="/login">
            <button>로그인하기</button>
          </Link>
        </div>
        <div className="flex flex-row justify-center lg:gap-20 xl:gap-40 items-center w-full sm:flex-col xs:flex-col md:flex-col lg:flex-row">
          <div className="flex flex-col items-center ">
            <Image src={catNdog} alt="cat&dog" width={300} height={100} />
            <h1 className="text-9xl xs:text-6xl sm:text-6xl md:text-7xl font-bold mb-4 font-hakgyo text-darkPink">
              {['댕', '냥', '살', '롱'].map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-jumping-text"
                  style={{ animationDelay: `${index * 1.5}s` }} // 각 글자마다 다르게 딜레이를 주어 순차적으로 점프
                >
                  {char}
                </span>
              ))}
            </h1>
          </div>
        </div>

        <div className="bottom-10 xs:bottom-5 absolute flex flex-col justify-center items-center gap-2">
          <p className="text-darkPink whitespace-nowrap">
            댕냥살롱은 무엇인가요?{' '}
          </p>
          <ChevronDoubleDownIcon
            className="size-8 text-darkPink"
            onClick={handleClick}
          />
        </div>
      </div>
      <div ref={mainRef} className="w-full bg-lightPinkbg">
        <MainComponent />
      </div>
      <CommunityIntroduction />
    </>
  );
}
