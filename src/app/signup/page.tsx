'use client';

import { useState } from 'react';
import Input from '@/components/shared/Input';
import EmailVerificationForm from '@/components/signup/EmailVerificationForm';
import SignupComponent from '@/components/signup/SignupComponent';
import Link from 'next/link';

const SignUp = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleCodeSubmit = (code: string) => {
    setVerificationCode(code);
    console.log('제출된 인증 코드:', code);
  };

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
  };

  const goToNextStep = () => {
    if (verificationCode) {
      setCurrentStep(2);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-lightPinkbg p-5 pt-10 pb-20">
      {currentStep === 1 && (
        <form className="flex flex-col gap-10 lg:w-1/3 xl:w-1/3">
          <h1 className="text-2xl font-bold text-center text-darkPink py-6 font-hakgyo">
            댕냥살롱
          </h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">회원가입</h2>
            <p>
              본인의 이름과 휴대전화번호 및 이메일을 모두 정확하게 입력해
              주세요.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Input
              name="name"
              type="text"
              placeholder="이름"
              onChange={(e) => setName(e.target.value)}
              error={[]}
            />
            <Input
              name="phone"
              type="text"
              placeholder="휴대전화번호"
              error={[]}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <EmailVerificationForm
            onCodeSubmit={handleCodeSubmit}
            onEmailSubmit={handleEmailSubmit}
          />

          <div className="flex flex-row justify-between items-center gap-2 *:h-10">
            <Link
              href="/"
              className="w-1/3 flex items-center justify-center text-center bg-lightPink rounded-l-2xl"
            >
              이전
            </Link>
            <button
              className="w-2/3 flex items-center justify-center text-center bg-darkPink rounded-r-2xl"
              type="button"
              onClick={goToNextStep}
              disabled={!verificationCode}
            >
              다음
            </button>
          </div>
        </form>
      )}
      {currentStep === 2 && (
        <SignupComponent name={name} phone={phone} email={email} />
      )}
    </div>
  );
};

export default SignUp;
