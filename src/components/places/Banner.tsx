import Image from 'next/image';
import dogPlaces from '../../asserts/places/dogPlaces.png';

const PlacesBanner = () => {
  return (
    <>
      <div className="flex flex-col  justify-center items-center *:text-white bg-[rgba(78,140,133,0.7)] h-52 w-full">
        <div className="flex flex-row justify-center items-center gap-6">
          <h1 className="text-4xl xs:text-xl sm:text-xl ">
            집사야 <br />
            오늘은 <br className="lg:hidden xl:hidden md:hidden" /> 나를 위한 <br />
            플랜 <br className="lg:hidden xl:hidden md:hidden" /> 좀 짜볼래?
          </h1>
          <Image src={dogPlaces} alt="hug" width={250} className="xs:w-52 sm:w-52" />
        </div>
      </div>
    </>
  );
};

export default PlacesBanner;
