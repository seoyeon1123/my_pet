import db from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: '이메일 또는 인증번호가 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    const verification = await db.verification.findFirst({
      where: { email, code },
    });

    // 인증번호가 없거나 만료된 경우
    if (!verification || verification.expiresAt < new Date()) {
      return NextResponse.json(
        { error: '잘못된 인증번호이거나 만료되었습니다.' },
        { status: 400 }
      );
    }

    // 인증 성공 처리 (필요에 따라 추가 로직 수행 가능)
    await db.verification.delete({ where: { id: verification.id } }); // 인증번호 삭제 (1회용)

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: '인증번호 확인 중 문제가 발생했습니다.' },
      { status: 500 }
    );
  }
}
