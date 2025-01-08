'use client';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useState } from 'react';
import FindIdAction from './actions';
import Link from 'next/link';

const FindId = () => {
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async () => {
    try {
      const user = await FindIdAction(name, email);
      if (user) {
        setUsername(user);
        setError('');
      } else {
        setError('입력하신 정보와 일치하는 사용자가 없습니다.');
      }
    } catch {
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightPinkbg p-5 pt-10 pb-20">
      <div className="xs:w-80 sm:w-80 md:w-96 lg:w-[450px] xl:w-[450px]">
        <h1 className="text-3xl font-bold text-center text-darkPink py-6 font-hakgyo">댕냥살롱</h1>

        <form
          className="flex flex-col gap-8"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-xl font-bold">아이디 찾기</h2>
            <p className="text-sm text-neutral-500">회원가입 할 때 입력했던 이름과 이메일을 입력해주세요.</p>
          </div>

          <div className="flex flex-col gap-6">
            <Input name="name" type="text" placeholder="이름" error={[]} onChange={(e) => setName(e.target.value)} />

            <Input
              name="email"
              type="email"
              placeholder="이메일"
              error={[]}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {username ? (
            <div className="text-center">
              <p className="w-full   py-3 border-2 border-darkPink rounded-2xl hover:bg-lightGreen/90 transition duration-300 ease-in-out ">
                회원님의 아이디는
                <span className="font-bold text-darkPink px-3">{username}</span>
                입니다.
              </p>
              <div className="flex justify-center gap-4 text-sm mt-4">
                <Link href="/login/find-id" className="hover:text-darkPink">
                  아이디 찾기
                </Link>
                <span>|</span>

                <Link href="/login/find-password" className="hover:text-darkPink">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          ) : (
            <Button type="submit" description="아이디 찾기" />
          )}
        </form>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindId;
