'use client';

import { EllipsisVerticalIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between p-5 bg-white fixed w-full z-10 shadow-md xl:px-20 lg:px-20 sm:px-10 xs:px-10 md:px-10">
      <Link href={'/home'} className="font-hakgyo text-darkPink text-4xl">
        댕냥살롱
      </Link>

      <div className=" sm:hidden xs:hidden md:hidden flex flex-row gap-6 text-lg">
        <Link
          href="/home/friends"
          className="hover:text-darkPink font-semibold transition-colors duration-300 ease-in-out">
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

      <div className="xs:hidden sm:hidden md:hidden w-40 flex flex-row justify-end">
        <UserIcon className="text-darkPink w-6 h-6 hover:text-darkPink" />
      </div>

      <div className="xl:hidden  lg:hidden relative">
        <EllipsisVerticalIcon
          className="text-darkPink w-8 h-8 cursor-pointer"
          onClick={() => setClick((prev) => !prev)}
        />
      </div>
      {click && (
        <div className="absolute top-16 px-10 w-full right-0 bg-white shadow-md rounded-lg flex flex-col gap-2 p-4 transition-transform ease-in-out ease-0.2s">
          <Link
            href="/home/friends"
            className="hover:text-darkPink font-semibold transition-colors duration-300 ease-in-out">
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
      )}
    </div>
  );
};

export default Header;
