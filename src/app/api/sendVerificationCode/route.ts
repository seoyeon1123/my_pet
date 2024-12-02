import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/emailSender';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: '이메일이 제공되지 않았습니다.' }, { status: 400 });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

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
    console.error('이메일 전송 중 에러 발생:', error); // 에러 로그 출력
    return NextResponse.json(
      { error: '이메일 전송 중 문제가 발생했습니다.', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
