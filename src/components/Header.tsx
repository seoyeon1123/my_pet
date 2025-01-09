'use client';

import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Header = () => {
  const [click, setClick] = useState(false);
  const path = usePathname();

  return (
    <div className="flex flex-row items-center justify-between p-5 bg-white fixed w-full z-50 shadow-md xl:px-20 lg:px-20 sm:px-5 xs:px-5 md:px-5">
      <Link href={'/friends'} className="font-hakgyo text-darkPink text-4xl">
        댕냥살롱
      </Link>

      <div className="sm:hidden xs:hidden md:hidden flex flex-row gap-6 text-lg">
        <Link href="/friends" className={`hover:text-darkPink ${path === '/friends' ? 'text-darkPink' : 'text-black'}`}>
          댕냥친구소
        </Link>
        <Link
          href="/community"
          className={`hover:text-darkPink ${path === '/community' ? 'text-darkPink' : 'text-black'}`}>
          댕냥광장
        </Link>
        <Link href="/places" className={`hover:text-darkPink ${path === '/places' ? 'text-darkPink' : 'text-black'}`}>
          댕냥터
        </Link>
        <Link href="/store" className={`hover:text-darkPink ${path === '/store' ? 'text-darkPink' : 'text-black'}`}>
          댕냥창고
        </Link>
        <Link
          href="/chatRoom"
          className={`hover:text-darkPink ${path === '/chatRoom' ? 'text-darkPink' : 'text-black'}`}>
          댕냥챗
        </Link>
      </div>

      <div className="xs:hidden sm:hidden md:hidden w-40 flex flex-row justify-end items-center">
        <Link href={'/myPage'}>
          <UserCircleIcon className="text-darkPink w-8 h-8 hover:text-darkPink" />
        </Link>
      </div>

      <div className="xl:hidden lg:hidden relative">
        <EllipsisVerticalIcon
          className="text-darkPink w-10 h-10 cursor-pointer"
          onClick={() => {
            setClick((prev) => !prev);
          }}
        />
      </div>

      {click && (
        <div className="absolute top-16 right-0 w-full bg-white shadow-md rounded-lg flex flex-col gap-2 p-4 z-50">
          <Link href="/friends" onClick={() => setClick(false)}>
            댕냥친구소
          </Link>
          <Link href="/community" onClick={() => setClick(false)}>
            댕냥광장
          </Link>
          <Link href="/places" onClick={() => setClick(false)}>
            댕냥터
          </Link>
          <Link href="/store" onClick={() => setClick(false)}>
            댕냥창고
          </Link>
          <Link href="/chatRoom" onClick={() => setClick(false)}>
            댕냥챗
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
