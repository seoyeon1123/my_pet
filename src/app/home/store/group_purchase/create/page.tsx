'use client';

import { useState } from 'react';

export default function GroupPurchaseForm() {
  const [title, setTitle] = useState('');
  const [reason, setReason] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(2);
  const [deliveryMethod, setDeliveryMethod] = useState('direct'); // direct or shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const groupData = {
      title,
      reason,
      maxParticipants,
      deliveryMethod,
    };

    // TODO: API 호출로 데이터를 서버에 저장
    console.log('공동구매 데이터:', groupData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">공동구매 제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="예: 배송비 절약을 위한 공동구매"
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">공동구매 이유</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="예: 최소 주문 수량 맞추기"
          className="w-full border border-gray-300 rounded-md p-2"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">참여 인원</label>
        <input
          type="number"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(Number(e.target.value))}
          min={2}
          className="w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">배송 방식</label>
        <select
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2">
          <option value="direct">직거래</option>
          <option value="shipping">택배 배송</option>
        </select>
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
        공동구매 생성
      </button>
    </form>
  );
}
