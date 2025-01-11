import Image from 'next/image';
import animalsGroup from '../../asserts/community/animalsGroup.png';
import { HeartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const CommunityBanner = () => {
  return (
    <>
      <div className="flex flex-col gap-3 justify-end items-center *:text-white bg-[rgba(231,178,125,0.7)] h-52 w-full">
        <div className="flex flex-row justify-center items-center pl-3 gap-6">
          <div className="flex flex-col  justify-start items-center text-center gap-3">
            <h1 className="text-4xl xs:text-2xl sm:text-2xl ">
              고민을
              <br className="lg:hidden xl:hidden md:hidden" />
              같이 <br /> 이야기해요!
            </h1>
            <Link
              href={'/community/post/create'}
              className="font-semibold bg-orange-500 mb-6 px-2 py-1 rounded-xl xs:text-sm sm:text-sm">
              광장에 글쓰기
            </Link>
          </div>

          <div className="flex flex-col justify-center items-center">
            <HeartIcon className="size-10 text-darkPink animate-bounce" />
            <Image src={animalsGroup} alt="hug" width={200} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityBanner;
