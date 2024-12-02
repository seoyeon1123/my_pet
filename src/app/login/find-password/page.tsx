'use client';

import EmailVerification from '@/components/findPassword/EmailVerification';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { useState } from 'react';
import { EditPassword } from './actions';
import { useRouter } from 'next/navigation';

const FindPassword = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleEmailVerificationSuccess = () => {
    setIsEmailVerified(true);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      await EditPassword(username, newPassword);
      alert('비밀번호가 성공적으로 변경되었습니다.');
      router.push('/login');
    } catch (err) {
      setError('비밀번호 변경에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightPinkbg p-5 pt-10 pb-20">
        <div className="lg:w-1/3 xl:w-1/3 w-full">
          <h1 className="text-3xl font-bold text-center text-darkPink py-6 font-hakgyo">
            댕냥살롱
          </h1>

          <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="text-xl font-bold">비밀번호 찾기</h2>
              <p className="text-sm text-neutral-500">
                회원가입 할 때 입력했던 아이디와 이메일을 입력해주세요.
              </p>
            </div>

            <div className="flex flex-col gap-6 mb-4">
              <Input
                name="username"
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={[]}
              />
            </div>
          </form>

          {isEmailVerified ? (
            <div className="mt-6">
              <h2 className="text-xl font-bold">새 비밀번호 설정</h2>
              <p className="text-sm text-neutral-500">
                이메일 인증이 완료되었습니다. 새 비밀번호를 설정해주세요.
              </p>
              <form
                className="flex flex-col gap-6 mt-4"
                onSubmit={handlePasswordChange}
              >
                <Input
                  name="newPassword"
                  type="password"
                  placeholder="새 비밀번호"
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={[]}
                />
                <Input
                  name="confirmPassword"
                  type="password"
                  placeholder="비밀번호 확인"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={[]}
                />
                <Button type="submit" description="비밀번호 변경" />
              </form>
            </div>
          ) : (
            <EmailVerification
              username={username}
              handleEmailVerificationSuccess={handleEmailVerificationSuccess}
            />
          )}

          {error && (
            <div className="mt-4 text-red-500 text-center">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FindPassword;
