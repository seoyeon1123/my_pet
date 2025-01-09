'use server';

import db from '@/lib/db';

export interface GetProductParams {
  query: string;
  offset?: number;
}

export async function getProduct({ query, offset = 0 }: GetProductParams) {
  const response = await fetch(
    `https://openapi.naver.com/v1/search/shop.json?query=${encodeURIComponent(query)}&display=15&start=${offset + 1}`,
    {
      method: 'GET',
      headers: {
        'X-Naver-Client-Id': 'fbEheJuAqeMtbWmbcQK1',
        'X-Naver-Client-Secret': 'ZIyqwX9402',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();

  return data.items;
}

export const getGroupPurchasesList = async () => {
  const GroupPurchasesList = await db.groupPurchase.findMany({
    select: {
      id: true,
      title: true,
      image: true,
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
      status: true,
    },
  });

  return GroupPurchasesList;
};
