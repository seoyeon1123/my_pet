'use client';

import CommunityIntroduction from '@/components/main/MainCommunityIntroduction';
import MainComponent from '@/components/main/MainComponent';
import MainLogin from '@/components/main/MainLogin';
import Image from 'next/image';
import catNdog from '../asserts/main/cat&dog.png';
import { ChevronDoubleDownIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (mainRef) {
      mainRef.current!.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <div className="relative bg-lightPink min-h-screen text-white text-center py-20 pb-32 flex flex-col justify-center  items-center w-full">
        <div className="flex flex-row justify-center lg:gap-20 xl:gap-40 items-center w-full sm:flex-col xs:flex-col md:flex-col lg:flex-row">
          <div className="flex flex-col items-center ">
            <Image src={catNdog} alt="cat&dog" width={300} height={100} />
            <h1
              className="text-9xl
            xs:text-6xl sm:text-6xl md:text-7xl
            font-bold mb-4 font-hakgyo text-darkPink "
            >
              댕냥살롱
            </h1>
          </div>
          <MainLogin />
        </div>

        <div
          className="bottom-10
        xs:bottom-5
        absolute flex flex-col justify-center items-center gap-2"
        >
          <p className="text-darkPink whitespace-nowrap">
            댕냥살롱은 무엇인가요?{' '}
          </p>
          <ChevronDoubleDownIcon
            className="size-8 text-darkPink"
            onClick={handleClick}
          />
        </div>
      </div>
      <div ref={mainRef} className="w-full   bg-lightPinkbg">
        <MainComponent />
      </div>
      <CommunityIntroduction />
    </>
  );
}
