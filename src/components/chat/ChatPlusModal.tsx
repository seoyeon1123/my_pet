'use client';

import { Invoice, Meeting, ProductInfo } from '@/app/(layout)/chatRoom/[id]/actions';
import { ProductInfoType } from '@/types/chatPlusModel';
import { ArchiveBoxIcon, ClipboardDocumentCheckIcon, MapPinIcon, PlusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface IChatPlusModalProps {
  chatRoomId: number;
  productId: bigint | undefined;
  isHost: boolean;
  userId: number;
  participants: {
    userId: number;
    chatRoomId: number;
    productId: bigint | undefined;
    isHost: boolean;
    username: string | null;
  }[];
}

const ChatPlusModal = ({ productId, isHost, userId, participants }: IChatPlusModalProps) => {
  const [clicked, setClicked] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingLocation, setMeetingLocation] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [recipientId, setRecipientId] = useState<number | null>(null);
  const [productInfo, setProductInfo] = useState<ProductInfoType | null>(null);

  const modifiedParticipants = participants.map((participant) => ({
    id: participant.userId,
    name: ` ${participant.username}`,
  }));

  const handleInvoiceSubmit = async () => {
    if (!setRecipientId) {
      alert('송장을 등록할 사용자를 선택해주세요.');
      return;
    }
    if (!selectedCourier || !trackingNumber) {
      alert('택배사와 송장 번호를 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      Invoice({ productId, selectedCourier, trackingNumber, recipientId });
      setIsInvoiceModalOpen(false);
      alert('송장이 등록되었습니다!');
      setSelectedCourier('');
      setTrackingNumber('');
      setRecipientId(null);
    } catch (error) {
      console.log(error);
      alert('송장 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMeetingSubmit = async () => {
    if (!meetingLocation || !meetingTime) {
      alert('장소와 시간을 모두 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      Meeting({ productId, meetingLocation, meetingTime });
      setIsMeetingModalOpen(false);
      alert(`약속이 등록되었습니다!\n장소: ${meetingLocation}\n시간: ${meetingTime}`);
      setMeetingLocation('');
      setMeetingTime('');
    } catch (error) {
      console.error('약속 등록 실패:', error);
      alert('약속 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const chatRoomProduct = async () => {
      const productInfo = await ProductInfo(participants[0].chatRoomId);
      setProductInfo(productInfo);
      console.log('productInfo', productInfo);
    };
    chatRoomProduct();
  }, [participants]);

  if (!isHost) return null;

  return (
    <div className="relative">
      <PlusIcon className="size-8 text-darkPink pr-2 font-semibold" onClick={() => setClicked((prev) => !prev)} />

      {clicked && (
        <div
          className="absolute top-[-24px] right-14 xs:-top-20 xs:-left-3 sm:-top-20 sm:-left-3
        md:-top-[86px] md:-left-3 lg:-top-[86px] lg:-left-3 
        *:text-white bg-white p-3 border rounded-xl flex flex-row gap-3 xs:w-36 sm:w-36 md:w-44 lg:w-44">
          <MapPinIcon
            className="size-10 xs:size-8 sm:size-8 bg-orange-600 rounded-full p-2 hover:cursor-pointer"
            onClick={() => setIsMeetingModalOpen(true)}
          />
          <ArchiveBoxIcon
            className="size-10 xs:size-8 sm:size-8 bg-green-600 rounded-full p-2 hover:cursor-pointer"
            onClick={() => setIsInvoiceModalOpen(true)}
          />
          <ClipboardDocumentCheckIcon
            className="size-10 xs:size-8 sm:size-8 bg-blue-600 rounded-full p-2 hover:cursor-pointer"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
      )}

      {isInvoiceModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold">송장 등록</h2>

            <div className="mt-4">
              <label>송장 등록할 사용자 선택</label>
              <select
                value={recipientId ?? ''}
                onChange={(e) => setRecipientId(Number(e.target.value))}
                className="w-full p-2 border rounded mt-2">
                <option value="">사용자 선택</option>
                {modifiedParticipants
                  .filter((participant) => participant.id !== userId) // 호스트 제외
                  .map((participant) => (
                    <option key={participant.id} value={participant.id}>
                      {participant.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="mt-4">
              <label>택배사 선택</label>
              <select
                value={selectedCourier}
                onChange={(e) => setSelectedCourier(e.target.value)}
                className="w-full p-2 border rounded mt-2">
                <option value="">택배사 선택</option>
                <option value="CJ대한통운">CJ대한통운</option>
                <option value="롯데택배">롯데택배</option>
                <option value="우체국">우체국</option>
              </select>
            </div>

            <div className="mt-4">
              <label>송장 번호</label>
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="송장 번호 입력"
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setIsInvoiceModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
                닫기
              </button>
              <button
                onClick={handleInvoiceSubmit}
                disabled={isSubmitting}
                className="bg-darkPink text-white py-2 px-4 rounded">
                {isSubmitting ? '등록 중...' : '송장 등록'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isMeetingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold">약속 설정</h2>

            <div className="mt-4">
              <label>만날 장소</label>
              <input
                type="text"
                value={meetingLocation}
                onChange={(e) => setMeetingLocation(e.target.value)}
                placeholder="장소 입력"
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mt-4">
              <label>만날 시간</label>
              <input
                type="datetime-local"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                className="w-full p-2 border rounded mt-2"
              />
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setIsMeetingModalOpen(false)} className="bg-gray-500 text-white py-2 px-4 rounded">
                닫기
              </button>
              <button onClick={handleMeetingSubmit} className="bg-darkPink text-white py-2 px-4 rounded">
                약속 설정
              </button>
            </div>
          </div>
        </div>
      )}

      {isInfoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center">공구 상품</h2>
            {productInfo ? (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <Image
                    src={productInfo.groupPurchase.image!}
                    alt="상품이미지"
                    width={200}
                    height={200}
                    className="rounded-2xl aspect-square"
                  />
                </div>
                <div className="flex flex-col gap-3 justify-start items-center">
                  <p className="font-semibold text-base">{productInfo.groupPurchase.title}</p>

                  <p className="text-white w-full py-2 rounded-xl bg-neutral-400 text-center">
                    {productInfo.groupPurchase.description}
                  </p>

                  <div className="flex flex-row items-center justify-start gap-2">
                    <span className="text-white bg-yellow-500 rounded-full px-3 py-1 text-sm">why?</span>
                    <p className="text-gray-700">{productInfo.groupPurchase.reason}</p>
                  </div>

                  <button
                    onClick={() => setIsInfoModalOpen(false)}
                    className="bg-gray-500 text-white py-2 px-4 rounded">
                    닫기
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">상품 정보를 불러오는 중입니다...</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPlusModal;
