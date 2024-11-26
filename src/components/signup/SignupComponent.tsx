import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '../shared/Input';
import { z } from 'zod';
import { createUser } from '@/app/signup/actions';

interface SignupComponentProps {
  name: string;
  phone: string;
  email: string;
}

const SignupComponent = ({ name, phone, email }: SignupComponentProps) => {
  const router = useRouter();
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      await createUser({
        name,
        phone,
        email,
        username: formState.username,
        password: formState.password,
      });

      alert('회원가입에 성공하셨습니다.');
      router.push('/pet-info-setup');
    } catch (err: any) {
      setError(err.message || '회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="max-h-screen w-full flex flex-col justify-center items-center bg-lightPinkbg p-5">
      <form
        className="flex flex-col gap-10 lg:w-1/3 xl:w-1/3"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center text-darkPink py-6 font-hakgyo">
          댕냥살롱
        </h1>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">회원가입</h2>
          <p>
            키즈노트에서 로그인 시 사용할 아이디와 비밀번호를 입력해 주세요.
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col gap-6">
          <Input
            name="username"
            type="text"
            placeholder="아이디"
            value={formState.username}
            onChange={handleInputChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={formState.password}
            onChange={handleInputChange}
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 재입력"
            value={formState.confirmPassword}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row justify-between items-center gap-2 *:h-10">
          <button
            type="button"
            onClick={() => router.back()} // 이전 페이지로 돌아가기
            className="w-1/3 flex items-center justify-center text-center bg-lightPink rounded-l-2xl"
          >
            이전
          </button>
          <button
            className="w-2/3 flex items-center justify-center text-center bg-darkPink rounded-r-2xl"
            type="submit"
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupComponent;
