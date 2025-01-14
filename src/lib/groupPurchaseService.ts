import db from './db';
import { sendFailGroupPurchase } from '@/utils/emailSender';

const groupPurchaseStatusCheck = async () => {
  // 현재 시간 기준 KST 자정을 설정
  const currentDate = new Date();
  currentDate.setUTCHours(15, 0, 0, 0); // KST 자정은 UTC 15:00
  const deadlineLimit = new Date(currentDate);
  deadlineLimit.setMinutes(deadlineLimit.getMinutes() + 5); // +5분 범위

  try {
    // KST 자정을 기준으로 RECRUITING 상태의 만료된 공구 찾기
    const expiredGroupPurchases = await db.groupPurchase.findMany({
      where: {
        deadline: { lte: deadlineLimit.toISOString() },
        status: 'RECRUITING',
      },
      include: {
        participants: {
          select: {
            email: true,
            user: {
              select: {
                username: true,
              },
            },
          },
        },
      },
    });

    console.log('Expired Group Purchases:', expiredGroupPurchases);

    if (expiredGroupPurchases.length === 0) {
      console.log('No expired group purchases to process.');
      return;
    }

    // 상태를 FAILED로 업데이트
    const failedGroupPurchaseIds = expiredGroupPurchases.map((gp) => gp.id);
    await db.groupPurchase.updateMany({
      where: {
        id: { in: failedGroupPurchaseIds },
      },
      data: {
        status: 'FAILED',
      },
    });

    // 참여자들에게 이메일 전송
    for (const gp of expiredGroupPurchases) {
      const emails = gp.participants.map((p) => p.email);
      const productTitle = gp.title;

      for (const email of emails) {
        try {
          await sendFailGroupPurchase(email!, productTitle);
        } catch (error) {
          console.error(`Failed to send email to ${email} for product ${productTitle}`, error);
        }
      }
    }
  } catch (error) {
    console.error('Error processing group purchases:', error);
  }
};

export default groupPurchaseStatusCheck;
