export const sendVerificationCode = async (email: string) => {
  const response = await fetch('/api/sendVerificationCode', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('이메일 전송에 실패했습니다. 서버 오류를 확인하세요.');
  }

  return response.json();
};
export const verifyCode = async (email: string, code: string) => {
  try {
    const response = await fetch('/api/verifyCode', {
      method: 'POST',
      body: JSON.stringify({ email, code }),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseBody = await response.text(); // 응답을 텍스트로 받음
    console.log(responseBody); // 응답을 콘솔에 출력하여 확인

    if (!response.ok) {
      const errorData = JSON.parse(responseBody); // 응답이 JSON일 경우 파싱
      throw new Error(errorData.error || '인증번호 확인 실패');
    }

    return JSON.parse(responseBody); // 응답을 JSON으로 파싱하여 반환
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || '인증번호 확인 실패');
    }
    throw new Error('인증번호 확인 실패');
  }
};
