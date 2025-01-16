import db from './db';
import { sendFailGroupPurchase } from '@/utils/emailSender';

const groupPurchaseStatusCheck = async () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  try {
    const expiredGroupPurchases = await db.groupPurchase.findMany({
      where: {
        deadline: {
          lte: currentDate.toISOString(),
        },
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
      // 이메일이 존재하는 참여자만 필터링
      const emails = gp.participants
        .map((p) => p.email)
        .filter((email) => email && email.trim() !== '' && email !== null); // 이메일이 없거나 빈 문자열, null인 경우 제외

      const productTitle = gp.title;

      if (emails.length === 0) {
        console.log(`유효한 이메일 주소가 없는 그룹 구매: ${productTitle}`);
        continue;
      }

      for (const email of emails) {
        // 이메일이 유효한 경우에만 이메일 전송
        if (email && email.trim() !== '') {
          try {
            await sendFailGroupPurchase(email, productTitle); // 이메일 전송
          } catch (error) {
            console.error(`이메일 전송 실패: ${email} (상품: ${productTitle})`, error);
          }
        } else {
          console.log(`유효하지 않은 이메일 주소: ${email} (상품: ${productTitle})`);
        }
      }
    }
  } catch (error) {
    console.error('Error occurred during group purchase status check:', error);
  }
};

export default groupPurchaseStatusCheck;
