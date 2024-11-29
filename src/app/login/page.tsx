'use client';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter 훅 추가
import loginAction from './actions';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginAction(username, password); // 로그인 시도
      router.push('/home');
    } catch (error: any) {
      // 에러 처리
      setError(error.message || '로그인에 실패했습니다.'); // 오류 메시지 설정
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightPinkbg p-5 pt-10 pb-20 ">
        <form
          className="flex flex-col gap-8 lg:w-1/3 xl:w-1/3 w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-bold text-center text-darkPink py-6 font-hakgyo">
            댕냥살롱
          </h1>

          <div className="flex flex-col gap-2 mb-6">
            <h2 className="text-xl font-bold">로그인</h2>
            <p className="text-sm text-neutral-500">
              본인의 아이디와 비밀번호를 정확하게 입력해주세요.
            </p>
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

          {/* 로그인 버튼 */}
          <Button type="submit" description="로그인" />
        </form>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="mt-4 text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        <div className="lg:w-1/3 xl:w-1/3 text-center">
          <hr className="border-t border-neutral-300 my-6" />

          <button
            onClick={() =>
              signIn('kakao', { redirect: true, callbackUrl: '/home' })
            }
            className="w-full bg-[#FEE500] text-[#000000 85%] py-3 rounded-2xl hover:bg-lightGreen/90 transition duration-300 ease-in-out"
          >
            카카오로 로그인하기
          </button>
        </div>

        <div className="flex justify-center gap-4 text-sm mt-4">
          <a href="#" className="hover:text-darkPink">
            아이디 찾기
          </a>
          <span>|</span>
          <a href="#" className="hover:text-darkPink">
            비밀번호 찾기
          </a>
        </div>
      </div>
    </>
  );
};

export default Login;
