import { useState } from 'react';
import { sendVerificationCode, verifyCode } from '@/services/emailService';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { firstCheckUser } from '@/app/signup/actions';

interface EmailVerificationFormProps {
  onCodeSubmit?: (code: string) => void;
  onEmailSubmit?: (email: string) => void;
}

const EmailVerificationForm = ({
  onCodeSubmit,
  onEmailSubmit,
}: EmailVerificationFormProps) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSendVerification = async () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    try {
      // 첫 번째 사용자 확인
      await firstCheckUser({ email });

      // 이메일 전송
      await sendVerificationCode(email);
      setIsEmailSent(true);
      setError('');
      if (onEmailSubmit) {
        onEmailSubmit(email);
      }
    } catch (err) {
      console.error(err);

      if (
        err instanceof Error &&
        err.message === '이미 사용 중인 이메일입니다.'
      ) {
        setError('이미 사용 중인 이메일입니다.');
      } else if (
        err instanceof Error &&
        err.message === '이미 사용 중인 휴대전화 번호 입니다.'
      ) {
        setError('이미 사용 중인 휴대전화 번호입니다.');
      } else {
        setError('이메일 전송에 실패했습니다.');
      }
    }
  };

  const handleSubmitCode = async () => {
    if (!verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }

    setIsVerifying(true);

    try {
      const response = await verifyCode(email, verificationCode);

      if (response.success) {
        setError('');
        if (onCodeSubmit) {
          onCodeSubmit(verificationCode);
        }

        alert('인증이 완료되었습니다!');
      } else {
        setError('잘못된 인증번호입니다.');
      }
    } catch (err) {
      console.error(err);
      setError('인증번호 확인에 실패했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        name="email"
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="button" onClick={handleSendVerification}>
        인증번호 전송
      </Button>
      {isEmailSent && (
        <p className="text-green-500">인증번호가 이메일로 전송되었습니다.</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      <Input
        name="verificationCode"
        type="text"
        placeholder="인증번호를 입력하세요"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <Button onClick={handleSubmitCode} disabled={isVerifying}>
        {isVerifying ? '인증 중...' : '인증번호 제출'}
      </Button>
    </div>
  );
};

export default EmailVerificationForm;
