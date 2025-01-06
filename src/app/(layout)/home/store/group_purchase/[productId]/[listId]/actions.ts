'use server';

import db from '@/lib/db';

const GetGroupPurchaseDetail = async (productId: string, listId: string) => {
  const bigIntListId = Number(listId);

  return db.groupPurchase.findUnique({
    where: {
      id: bigIntListId,
    },
    select: {
      userId: true,
      image: true,
      id: true,
      title: true,
      description: true,
      expectedPrice: true,
      maxParticipants: true,
      deadline: true,
      reason: true,
      deliveryMethod: true,
      shippingCost: true,
      direct: true,
      createdAt: true,
      updatedAt: true,
      productId: true,
      productCategory: true,
      participants: {
        select: {
          userId: true,
          groupPurchaseId: true,
          email: true,
        },
      },
    },
  });
};

export const CreateGroupPurchaseParticipant = async (email: string, groupPurchaseId: number, userId: number) => {
  const newParticipant = await db.groupPurchaseParticipant.create({
    data: {
      userId,
      email,
      groupPurchaseId,
      isHost: false,
    },
  });

  const groupPurchase = await db.groupPurchase.findUnique({
    where: { id: groupPurchaseId },
    include: { participants: true },
  });

  if (!groupPurchase) {
    throw new Error('공동구매를 찾을 수 없습니다.');
  }

  if (groupPurchase.participants.length === groupPurchase.maxParticipants) {
    const chatRoom = await db.chatRoom.create({
      data: {
        groupPurchaseId,
        participants: {
          create: groupPurchase.participants.map((p) => ({
            userId: p.userId,
          })),
        },
      },
    });

    return { newParticipant, chatRoom };
  }

  return { newParticipant };
};

type User = {
  id: number;
  username: string | null;
  email: string;
};

export const FindUser = async (id: number): Promise<User | null> => {
  return await db.user.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
};

export default GetGroupPurchaseDetail;
