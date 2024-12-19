'use server';

import db from '@/lib/db';

const GetGroupPurchase = async (productId: number) => {
  const groupPurchase = await db.groupPurchase.findMany({
    where: {
      productId,
    },
    select: {
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
    },
  });

  return groupPurchase;
};

export default GetGroupPurchase;
