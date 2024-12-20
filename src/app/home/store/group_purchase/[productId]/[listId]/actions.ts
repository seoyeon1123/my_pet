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
    },
  });
  return newParticipant;
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
      id: true, // id 필드를 추가
      username: true,
      email: true,
    },
  });
};

export default GetGroupPurchaseDetail;
