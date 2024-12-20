'use server';

import db from '@/lib/db';

interface IPurchaseProps {
  data: {
    image: string;
    title: string;
    description: string;
    expectedPrice: number;
    maxParticipants: number;
    deadline: string;
    reason: string;
    deliveryMethod: string;
    shippingCost: number | null;
    productId: number;
    productCategory: string;
    direct: string | null;
    userId: number;
  };
}

const createPurchase = async ({ data }: IPurchaseProps) => {
  await db.groupPurchase.create({
    data: {
      userId: data.userId,
      image: data.image,
      title: data.title,
      description: data.description,
      expectedPrice: data.expectedPrice,
      maxParticipants: data.maxParticipants,
      deadline: data.deadline,
      reason: data.reason,
      deliveryMethod: data.deliveryMethod,
      shippingCost: data.shippingCost,
      productId: data.productId,
      productCategory: data.productCategory,
      direct: data.direct,
    },
  });
};

export default createPurchase;
