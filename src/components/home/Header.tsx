'use client';

import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const [click, setClick] = useState(false);
  const path = usePathname();

  return (
    <div className="flex flex-row items-center justify-between p-5 bg-white fixed w-full z-50 shadow-md xl:px-20 lg:px-20 sm:px-5 xs:px-5 md:px-5">
      <Link href={'/home'} className="font-hakgyo text-darkPink text-4xl">
        댕냥살롱
      </Link>

      {/* Desktop Links */}
      <div className="sm:hidden xs:hidden md:hidden flex flex-row gap-6 text-lg">
        <Link
          href="/home/friends"
          className={`hover:text-darkPink ${path === '/home/friends' ? 'text-darkPink' : 'text-black'}`}>
          댕냥친구소
        </Link>
        <Link
          href="/home/community"
          className={`hover:text-darkPink ${path === '/home/community' ? 'text-darkPink' : 'text-black'}`}>
          댕냥광장
        </Link>
        <Link
          href="/home/places"
          className={`hover:text-darkPink ${path === '/home/places' ? 'text-darkPink' : 'text-black'}`}>
          댕냥터
        </Link>
        <Link
          href="/home/store"
          className={`hover:text-darkPink ${path === '/home/store' ? 'text-darkPink' : 'text-black'}`}>
          댕냥창고
        </Link>
        <Link
          href="/home/caregivers"
          className={`hover:text-darkPink ${path === '/home/caregivers' ? 'text-darkPink' : 'text-black'}`}>
          댕냥맘
        </Link>
      </div>

      <div className="xs:hidden sm:hidden md:hidden w-40 flex flex-row justify-end items-center">
        <Link href={'/chatRoom'}>
          <ChatBubbleOvalLeftIcon className=" w-7 h-7 text-yellow-500 font-extrabold" />
        </Link>
        <UserIcon className="text-darkPink w-6 h-6 hover:text-darkPink" />
      </div>

      <div className="xl:hidden lg:hidden relative">
        <EllipsisVerticalIcon
          className="text-darkPink w-8 h-8 cursor-pointer"
          onClick={() => {
            setClick((prev) => !prev);
          }}
        />
      </div>

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
