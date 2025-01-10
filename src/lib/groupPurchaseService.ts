import { GroupPurchaseStatus } from '@prisma/client'; // Prisma에서 정의된 GroupPurchaseStatus enum
import db from './db';
import { sendFailGroupPurchase } from '@/utils/emailSender';

const groupPurchaseStatusCheck = async () => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 5); // 현재 시간에 5분을 더함
  const currentDateISOString = currentDate.toISOString(); // UTC 기준으로 변환

  try {
    const expiredGroupPurchases = await db.groupPurchase.findMany({
      where: {
        deadline: {
          lt: currentDateISOString,
        },
        status: GroupPurchaseStatus.RECRUITING,
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

    if (expiredGroupPurchases.length === 0) {
      console.log('No expired group purchases to process.');
      return;
    }

    const failedGroupPurchaseIds = expiredGroupPurchases.map((gp) => gp.id);
    await db.groupPurchase.updateMany({
      where: {
        id: {
          in: failedGroupPurchaseIds,
        },
      },
      data: {
        status: GroupPurchaseStatus.FAILED,
      },
    });

    for (const gp of expiredGroupPurchases) {
      const emails = gp.participants.map((p) => p.email);
      const productTitle = gp.title;

      for (const email of emails) {
        await sendFailGroupPurchase(email!, productTitle);
      }
    }
  } catch (error) {
    console.error('Error processing group purchases:', error);
  }
};

export default groupPurchaseStatusCheck;
