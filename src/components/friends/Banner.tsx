import Image from 'next/image';
import Link from 'next/link';
import dogNcat from '../../asserts/friends/dogScatS.png';

const Banner = () => {
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center *:text-white bg-[rgba(211,118,118,0.7)] h-52 w-full">
        <div className="flex flex-row justify-center items-center ">
          <h1 className="text-4xl ">
            내 애완견을 소개하고, <br /> 내 애완견의 친구를 찾아보아요!
          </h1>
          <Image src={dogNcat} alt="hug" width={200} />
        </div>
        <div>
          <Link href={'/home/friends/pet-info-setup'} className="font-semibold hover:text-pink-500">
            애완견 등록하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default Banner;
