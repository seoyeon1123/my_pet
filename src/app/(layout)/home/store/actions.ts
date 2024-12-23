'use server';

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
