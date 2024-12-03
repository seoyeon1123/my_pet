import { UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div className="flex flex-row gap-4 justify-between items-center p-5 bg-white">
        <h1 className="font-hakgyo text-darkPink text-4xl w-40">댕냥살롱</h1>
        <div className="flex flex-row gap-10 text-lg transition-transform">
          <Link
            href="/home/friends"
            className="hover:text-darkPink *:font-semibold transition-colors duration-300 ease-in-out">
            댕냥친구소
          </Link>
          <Link href="/home/community" className="hover:text-darkPink transition-colors duration-300 ease-in-out">
            댕냥광장
          </Link>
          <Link href="/home/places" className="hover:text-darkPink transition-colors duration-300 ease-in-out">
            댕냥터
          </Link>
          <Link href="/home/store" className="hover:text-darkPink transition-colors duration-300 ease-in-out">
            댕냥창고
          </Link>
          <Link href="/home/caregivers" className="hover:text-darkPink transition-colors duration-300 ease-in-out">
            댕냥맘
          </Link>
        </div>

        <div className="w-40">
          <UserIcon className="text-darkPink size-8 hover:text-darkPink" />
        </div>
      </div>
    </>
  );
};

export default Header;
