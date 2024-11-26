import { NextResponse } from 'next/server';
import { sendVerificationEmail } from '@/utils/emailSender';

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

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const response = await sendVerificationEmail(email, verificationCode);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '이메일 전송 중 문제가 발생했습니다.' },
      { status: 500 }
    );
  }
}
