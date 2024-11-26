export const sendVerificationCode = async (email: string) => {
  const response = await fetch('/api/sendVerificationCode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '인증번호 전송에 실패했습니다.');
  }

  return response.json();
};

export const verifyCode = async (email: string, code: string) => {
  try {
    const response = await fetch('/api/sendVerificationCode', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('인증번호 확인 실패');
    }

    return response.json(); // 인증번호 검증 결과를 반환
  } catch (error: unknown) {
    // error가 Error 타입인지 확인 후 처리
    if (error instanceof Error) {
      throw new Error(error.message || '인증번호 확인 실패');
    }
    // error가 Error 타입이 아닌 경우 기본 메시지로 처리
    throw new Error('인증번호 확인 실패');
  }
};
