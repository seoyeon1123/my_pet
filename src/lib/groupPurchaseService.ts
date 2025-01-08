import { GroupPurchaseStatus } from '@prisma/client'; // Prisma에서 정의된 GroupPurchaseStatus enum
import db from './db';
import { sendFailGroupPurchase } from '@/utils/emailSender';

const groupPurchaseStatusCheck = async () => {
  try {
    const expiredGroupPurchases = await db.groupPurchase.findMany({
      where: {
        deadline: {
          lt: new Date(),
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

    // 2. 상태를 'FAILED'로 업데이트
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

    console.log('Updated group purchases to "FAILED".');

    for (const gp of expiredGroupPurchases) {
      const emails = gp.participants.map((p) => p.email);
      const productTitle = gp.title;

      for (const email of emails) {
        await sendFailGroupPurchase(email!, productTitle);
      }
    }

    console.log('Emails sent to participants.');
  } catch (error) {
    console.error('Error processing group purchases:', error);
  }
};

export default groupPurchaseStatusCheck;
