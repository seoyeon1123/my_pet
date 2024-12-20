import { NextResponse } from 'next/server';
import { sendConfirmationEmail } from '@/utils/emailSender';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, product, deadline } = body;

    if (!email || !product || !deadline) {
      return NextResponse.json({ error: '이메일, 제품명 또는 마감일이 제공되지 않았습니다.' }, { status: 400 });
    }

    const response = await sendConfirmationEmail(email, product, deadline);

    return NextResponse.json({ success: true, response }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: '이메일 전송 중 문제가 발생했습니다.', details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
