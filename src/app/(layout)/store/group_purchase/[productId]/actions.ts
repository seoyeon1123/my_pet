'use server';

import db from '@/lib/db';

const GetGroupPurchase = async (productId: number) => {
  const groupPurchase = await db.groupPurchase.findMany({
    where: {
      productId,
    },
    select: {
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
          groupPurchaseId: true,
          email: true,
        },
      },
    },
  });

  // participants.email이 null인 경우 빈 문자열로 처리
  return groupPurchase.map((purchase) => ({
    ...purchase,
    participants: purchase.participants.map((participant) => ({
      ...participant,
      email: participant.email || '', // null을 빈 문자열로 처리
    })),
  }));
};

export default GetGroupPurchase;
