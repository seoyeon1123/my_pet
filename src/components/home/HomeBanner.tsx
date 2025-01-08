import Image from 'next/image';
import Link from 'next/link';
import homeImage from '../../asserts/home/homeImage.png';

const HomeBanner = () => {
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center *:text-white bg-[rgba(211,118,118,0.7)] h-52 w-full">
        <div className="flex flex-row  justify-center items-center pl-3 ">
          <h1 className="text-4xl xs:text-xl sm:text-xl ">
            <br className="lg:hidden xl:hidden md:hidden" />
            내 강아지와 <br /> 나의 순간 <br /> 한곳에서 <br />
            편리하게 관리하세요!
          </h1>
          <Image src={homeImage} alt="hug" width={200} />
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
