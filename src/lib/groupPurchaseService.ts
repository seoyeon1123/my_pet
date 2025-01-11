import db from './db';
import { sendFailGroupPurchase } from '@/utils/emailSender';

const groupPurchaseStatusCheck = async () => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 5);
  const currentDateISOString = currentDate.toISOString();

  try {
    const expiredGroupPurchases = await db.groupPurchase.findMany({
      where: {
        deadline: { lte: currentDateISOString },
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

    if (expiredGroupPurchases.length === 0) {
      console.log('No expired group purchases to process.');
      return;
    }

    const failedGroupPurchaseIds = expiredGroupPurchases.map((gp) => gp.id);
    await db.groupPurchase.updateMany({
      where: {
        id: { in: failedGroupPurchaseIds },
      },
      data: {
        status: 'FAILED',
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
