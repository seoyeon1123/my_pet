'use client';

import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import { stripTags } from '@/lib/utils';
import { storeState } from '@/state/storeState';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import createPurchase from './actions';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const GroupPurcase = () => {
  const [description, setDescription] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(2);
  const [deadline, setDeadline] = useState('');
  const [reason, setReason] = useState('');
  const [reasonOption, setReasonOption] = useState('하나를 구매해서 나눠서 사용해봐요!');
  const [deliveryMethod, setDeliveryMethod] = useState('직거래');
  const [shippingCost, setShippingCost] = useState('');
  const [direct, setDirect] = useState('');

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data } = useSession();

  const product = useRecoilValue(storeState);
  const { mutateAsync, isLoading } = useMutation(createPurchase, {
    onSuccess: () => {
      alert('공동구매가 성공적으로 생성되었습니다!');
      router.push(`/home/store/group_purchase/${product.productId}`);
    },
    onError: () => alert('공동구매 생성에 실패했습니다. 다시 시도해 주세요.'),
  });

  useEffect(() => {
    if (product && product.productId) {
      setLoading(false);
    }
  }, [product]);

  const formattedDeadline = deadline ? new Date(deadline).toISOString() : '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product || !product.title) {
      alert('상품 정보가 올바르게 로드되지 않았습니다.');
      return;
    }

    const groupData = {
      image: product.image,
      title: stripTags(product.title),
      description,
      expectedPrice: Number(expectedPrice),
      maxParticipants,
      deadline: formattedDeadline,
      reason: reason || reasonOption,
      deliveryMethod,
      shippingCost: deliveryMethod === 'shipping' ? (shippingCost ? parseFloat(shippingCost) : null) : null,
      productId: Number(product.productId),
      productCategory: product.category3,
      direct,
      userId: Number(data?.user.id),
    };

    try {
      await mutateAsync({ data: groupData });
    } catch (error) {
      console.error('Error creating purchase:', error);
    }
  };

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  if (!product || !product.title) {
    return <div>상품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-xl font-bold mb-6 text-center">공동구매 생성</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col justify-center gap-2 items-center p-3 border-2 rounded-2xl">
          <label className="block text-xl font-semibold text-gray-800">상품명</label>
          <p className="text-lg text-gray-600 font-medium text-center">{stripTags(product.title)}</p>
          <p className="bg-darkPink text-white rounded-2xl px-2 py-1">
            {product.category3} | {product.category4}
          </p>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            className="rounded-xl shadow-lg border border-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">설명</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="공동 구매에 대한 설명을 작성해주세요 .."
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink transition duration-300 ease-in-out w-full"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">예상 단가 (원)</label>
            <Input
              name="expectedPrice"
              type="number"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(e.target.value)}
              placeholder="예: 10000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">최대 참여 인원</label>
            <Input
              name="maxParticipants"
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              placeholder="숫자를 입력해주세요"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">마감일</label>
          <Input
            name="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="연도.. 월.. 일"
          />
        </div>

        {/* Reason */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">공동구매 이유</label>
          <select
            name="reasonOption"
            value={reasonOption}
            onChange={(e) => setReasonOption(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-darkPink mb-2">
            <option value="하나를 구매해서 나눠서 사용해봐요!">하나를 구매해서 나눠서 사용해봐요!</option>
            <option value="최소 주문 금액을 맞추려고 해요!">최소 주문 금액을 맞추려고 해요!</option>
            <option value="배송비 절약하고 싶어요!">배송비 절약하고 싶어요! </option>
            <option value="기타">기타</option>
          </select>
          {reasonOption === 'other' && (
            <textarea
              name="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="기타 이유를 입력하세요."
              className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink transition duration-300 ease-in-out w-full"
              rows={3}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium mb-2 text-gray-700">배송 방식</label>
          <select
            name="deliveryMethod"
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-darkPink">
            <option value="직거래">직거래</option>
            <option value="택배 배송">택배 배송</option>
          </select>
          {deliveryMethod === '택배 배송' && (
            <Input
              name="shippingCost"
              type="number"
              value={shippingCost}
              onChange={(e) => setShippingCost(e.target.value)}
              placeholder="추가 배송비 (원)"
            />
          )}
          {deliveryMethod === '직거래' && (
            <Input
              name="direct"
              type="text"
              value={direct}
              onChange={(e) => setDirect(e.target.value)}
              placeholder="'까치산역 4번출구 앞'와 같이 상세하게 입력해주세요 :)"
            />
          )}
        </div>

        <Button type="submit">공동구매 생성</Button>
      </form>
    </div>
  );
};

export default GroupPurcase;
