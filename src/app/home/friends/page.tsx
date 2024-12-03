import Image from 'next/image';
import cat from '../../../asserts/friends/cat.png';
import dog from '../../../asserts/friends/dog.png';
import Banner from '@/components/friends/Banner';

const Friends = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-center gap-2">
        <Banner />
        <div className="flex flex-row  w-[190px] border border-darkPink rounded-2xl overflow-hidden">
          <p className="flex flex-row justify-center items-center hover:bg-darkPink px-3 py-2 transition-colors ease-in-out border-r border-darkPink flex-1">
            <Image src={dog} alt="강아지" width={24} className="mr-2" />
            <span className="text-sm">댕친구</span>
          </p>
          <p className="flex flex-row justify-center items-center hover:bg-darkPink px-3 py-2 transition-colors ease-in-out flex-1">
            <Image src={cat} alt="고양이" width={24} className="mr-2" />
            <span className="text-sm">냥친구</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Friends;
