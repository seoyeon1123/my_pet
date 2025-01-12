import { NextResponse } from 'next/server';
import { sendFailGroupPurchase } from '@/utils/emailSender'; // 이메일 발송 유틸
import db from '@/lib/db';

export async function GET(req: Request) {
  // 인증 확인
  const authHeader = req.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const currentDate = new Date();

    // 마감된 공동구매 검색
    const expiredGroupPurchases = await db.groupPurchase.findMany({
      where: {
        deadline: { lte: currentDate },
        status: 'RECRUITING',
      },
      include: {
        participants: {
          select: {
            email: true,
          },
        },
      },
    });

    if (expiredGroupPurchases.length === 0) {
      console.log('No expired group purchases to process.');
      return NextResponse.json({ message: 'No expired group purchases to process.' });
    }

    // 상태를 FAILED로 업데이트
    const failedGroupPurchaseIds = expiredGroupPurchases.map((gp) => gp.id);
    await db.groupPurchase.updateMany({
      where: {
        id: { in: failedGroupPurchaseIds },
      },
      data: { status: 'FAILED' },
    });

    // 이메일 발송
    for (const gp of expiredGroupPurchases) {
      const emails = gp.participants.map((p) => p.email);
      const productTitle = gp.title;

      for (const email of emails) {
        await sendFailGroupPurchase(email!, productTitle);
      }
    }

    return NextResponse.json({
      message: `Updated ${failedGroupPurchaseIds.length} group purchases to FAILED.`,
    });
  } catch (error) {
    console.error('Error processing cron job:', error);
    return NextResponse.json({ error: 'Failed to process cron job' }, { status: 500 });
  }
}
