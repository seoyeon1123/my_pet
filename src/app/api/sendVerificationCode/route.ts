import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/emailSender';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: '이메일이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 인증번호 생성
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // 인증번호 유효기간 설정 (예: 현재 시간으로부터 10분)
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // 데이터베이스에 인증번호 저장
    await db.verification.create({
      data: {
        email,
        code: verificationCode,
        expiresAt,
      },
    });

    // 이메일 전송
    const response = await sendVerificationEmail(email, verificationCode);

    return NextResponse.json({ success: true, response }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '이메일 전송 중 문제가 발생했습니다.' },
      { status: 500 }
    );
  }
}
