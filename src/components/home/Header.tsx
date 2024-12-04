'use client';

import { EllipsisVerticalIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const [click, setClick] = useState(false);

  return (
    <div className="flex flex-row items-center justify-between p-5 bg-white fixed w-full z-50 shadow-md xl:px-20 lg:px-20 sm:px-10 xs:px-10 md:px-10">
      <Link href={'/home'} className="font-hakgyo text-darkPink text-4xl">
        댕냥살롱
      </Link>

      {/* Desktop Links */}
      <div className="sm:hidden xs:hidden md:hidden flex flex-row gap-6 text-lg">
        <Link href="/home/friends" className="hover:text-darkPink font-semibold">
          댕냥친구소
        </Link>
        <Link href="/home/community" className="hover:text-darkPink">
          댕냥광장
        </Link>
        <Link href="/home/places" className="hover:text-darkPink">
          댕냥터
        </Link>
        <Link href="/home/store" className="hover:text-darkPink">
          댕냥창고
        </Link>
        <Link href="/home/caregivers" className="hover:text-darkPink">
          댕냥맘
        </Link>
      </div>

      {/* User Icon */}
      <div className="xs:hidden sm:hidden md:hidden w-40 flex flex-row justify-end">
        <UserIcon className="text-darkPink w-6 h-6 hover:text-darkPink" />
      </div>

      {/* Mobile Menu Icon */}
      <div className="xl:hidden lg:hidden relative">
        <EllipsisVerticalIcon
          className="text-darkPink w-8 h-8 cursor-pointer"
          onClick={() => {
            console.log('Icon clicked, updating state.');
            setClick((prev) => !prev);
          }}
        />
      </div>

      {/* Dropdown Menu */}
      {click && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md rounded-lg flex flex-col gap-2 p-4 z-50">
          <Link href="/home/friends" onClick={() => setClick(false)}>
            댕냥친구소
          </Link>
          <Link href="/home/community" onClick={() => setClick(false)}>
            댕냥광장
          </Link>
          <Link href="/home/places" onClick={() => setClick(false)}>
            댕냥터
          </Link>
          <Link href="/home/store" onClick={() => setClick(false)}>
            댕냥창고
          </Link>
          <Link href="/home/caregivers" onClick={() => setClick(false)}>
            댕냥맘
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
