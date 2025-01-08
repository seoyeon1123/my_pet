'use client';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        redirect: false,
        username,
        password,
      });

      if (result?.error) {
        setError('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
      } else {
        alert('로그인에 성공하셨습니다.');
        router.push('/home');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightPinkbg p-5 pt-10 pb-20">
      <form className="flex flex-col gap-8 xs:w-80 sm:w-80 md:w-96 lg:w-[450px] xl:w-[450px]" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center text-darkPink py-6 font-hakgyo">댕냥살롱</h1>

        <div className="flex flex-col gap-2 mb-6">
          <h2 className="text-xl font-bold">로그인</h2>
          <p className="text-sm text-neutral-500">본인의 아이디와 비밀번호를 정확하게 입력해주세요.</p>
        </div>

        <div className="flex flex-col gap-6">
          <Input
            name="username"
            type="text"
            placeholder="아이디"
            onChange={(e) => setUsername(e.target.value)}
            error={[]}
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            error={[]}
          />
        </div>

        <Button type="submit" description="로그인" />
      </form>

      {error && (
        <div className="mt-4 text-red-500 text-center">
          <p>{error}</p>
        </div>
      )}

      <div className=" text-center">
        <hr className="border-t border-neutral-300 my-6" />

        <button
          onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/home' })}
          className="xs:w-80 sm:w-80 md:w-96 lg:w-[450px] xl:w-[450px] bg-[#FEE500] text-[#000000 85%] py-3 rounded-2xl hover:bg-lightGreen/90 transition duration-300 ease-in-out">
          카카오로 로그인하기
        </button>
      </div>

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
  );
};

export default Login;
