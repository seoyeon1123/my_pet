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

export const getGroupPurchasesList = async (page: number, pageSize: number) => {
  const skip = (page - 1) * pageSize; // 페이지네이션을 위한 skip 계산
  const take = pageSize; // 한 페이지에 가져올 데이터 개수

  // 전체 그룹 구매 개수를 가져오기
  const totalCount = await db.groupPurchase.count();

  // 그룹 구매 리스트 가져오기
  const GroupPurchasesList = await db.groupPurchase.findMany({
    skip,
    take,
    orderBy: {
      createdAt: 'desc',
    },
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

  return { items: GroupPurchasesList, totalCount }; // 데이터와 전체 개수를 반환
};
