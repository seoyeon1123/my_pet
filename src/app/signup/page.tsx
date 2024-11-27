'use client';

import { useState } from 'react';
import Input from '@/components/shared/Input';
import EmailVerificationForm from '@/components/signup/EmailVerificationForm';
import Link from 'next/link';
import SignupComponent from '@/components/signup/SignupComponent';

const SignUp = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const validatePhone = (phone: string) => {
    // 전화번호가 10자리 또는 11자리 숫자와 하이픈을 포함하는 형식인지 확인하는 정규식
    const phoneRegex = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/;
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhone = e.target.value;
    setPhone(inputPhone);

    if (inputPhone && !validatePhone(inputPhone)) {
      setErrors((prev) => ({
        ...prev,
        phone: '유효한 전화번호를 입력해주세요.',
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        phone: undefined, // 오류 메시지 제거
      }));
    }
  };

  const goToNextStep = () => {
    if (verificationCode) {
      setCurrentStep(2);
    }
  };

  const handleCodeSubmit = (code: string) => {
    setVerificationCode(code);
    console.log('제출된 인증 코드:', code);
  };

  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
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
              error={errors.name ? [errors.name] : []}
            />
            <div>
              <Input
                name="phone"
                type="text"
                placeholder="휴대전화번호"
                onChange={handlePhoneChange} // 전화번호 입력 시 실시간 검증
                value={phone}
                error={[]} // 에러 메시지 표시
              />
              {errors.phone && (
                <p className="text-red-500 text-base mt-2">{errors.phone}</p>
              )}
            </div>
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
