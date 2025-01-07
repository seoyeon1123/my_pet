'use client';

import { useRecoilValue } from 'recoil';
import { storeState } from '@/state/storeState';
import Image from 'next/image';
import { formatToWon, stripTags } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Loading from '../Loading';

const GroupPurchaseDetail = ({ productId }: { productId: string }) => {
  const product = useRecoilValue(storeState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (product && product.productId) {
      setLoading(false);
    }
  }, [product]);

  if (loading) {
    return <Loading />;
  }

  if (product.productId !== productId) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className=" mx-auto p-5">
      <p className="xs:text-sm sm:text-sm ">
        {product.category1} &gt; {product.category2} &gt; {product.category3} &gt; {product.category4}
      </p>
      <hr className="border border-b border-neutral-300 my-5" />

      <div className="flex flex-row justify-center items-center gap-5 xs:flex-col sm:flex-col">
        {product.image && (
          <Image src={product.image} alt={product.title} width={500} height={500} className="rounded-xl" />
        )}

        <div className="flex flex-col justify-around lg:w-[500px] lg:h-[500px]">
          <div>
            <p className="mb-4 space-x-2">
              <span className="font-semibold text-xl text-darkPink">{product.mallName}</span>
              <span>에서 구매 가능해요!</span>
            </p>
            <h2 className="text-2xl font-semibold mb-2">{stripTags(product.title)}</h2>
            <p className="text-3xl font-bold text-end text-gray-700 mb-4">{formatToWon(product.lprice)}</p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-end items-center gap-2">
              <span>상품을 자세하게 보고 싶다면?</span>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                상품 상세보기
              </a>
            </div>
            <div className="flex flex-col p-6 bg-lightPink border border-darkPink rounded-xl shadow-md gap-4">
              <p className="text-xl font-semibold">
                같이 구매하면 <strong className="text-red-600">배송비</strong>를 절약할 수 있어요!
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between texxt-base">
                  <span>혼자 사면...</span>
                  <span>{formatToWon(Number(product.lprice))}</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span>
                    💸 <strong className="text-red-600">두명</strong>이 같이 사면?
                  </span>
                  <span>{formatToWon((Number(product.lprice) / 2).toFixed(1))}</span>
                </div>
                <div className="flex flex-row justify-between">
                  <span>
                    💸 <strong className="text-red-600">세명</strong>이 같이 사면?
                  </span>
                  <span>{formatToWon((Number(product.lprice) / 3).toFixed(1))}</span>
                </div>

                <Link href="/home/store/group_purchase/create" className="text-end my-1">
                  공동구매 시작하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPurchaseDetail;
