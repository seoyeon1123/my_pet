'use client';
import { useState } from 'react';
import { useQuery } from 'react-query';
import GetGroupPurchaseDetail, { FindUser } from './actions';
import Image from 'next/image';
import {
  ArrowLongRightIcon,
  BanknotesIcon,
  CalendarIcon,
  FaceSmileIcon,
  TruckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import ParticipationModal from '@/components/store/ParticipationModal';
import { useSession } from 'next-auth/react';

import { useMemo } from 'react';

const GroupPurchaseListDetail = ({ params }: { params: { productId: string; listId: string } }) => {
  const { productId, listId } = params;
  const { data: userSession } = useSession();

  const { data, isLoading } = useQuery(['groupPurchaseDetail', productId, listId], () =>
    GetGroupPurchaseDetail(productId, listId),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: userData, isLoading: isUserLoading } = useQuery(['user', data?.userId], () => FindUser(data?.userId!), {
    enabled: !!data?.userId,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const isAlreadyParticipated = useMemo(() => {
    if (!data?.participants || !userSession?.user.id) return false;
    return data.participants?.some((participant) => participant.userId.toString() === userSession.user.id.toString());
  }, [data, userSession]);

  if (isLoading || isUserLoading) return <p>Loading...</p>;
  if (!data) return <p>공동 구매 정보를 찾을 수 없습니다.</p>;

  return (
    <div className="p-10 mx-auto max-w-4xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-darkPink mb-6 text-center">{data.title}</h1>

        <div className="flex justify-center mb-6">
          <Image src={data.image} alt={data.title} width={300} height={300} className="rounded-lg shadow-md" />
        </div>

        {/* 설명 */}
        <p className="text-gray-700 mb-6 text-lg bg-lightPink p-6 rounded-lg shadow-sm">{data.description}</p>

        {/* 정보 */}
        <div className="space-y-4 border border-neutral-300 rounded-xl p-5">
          <p className="text-gray-700 flex items-center gap-2">
            <FaceSmileIcon className="w-5 h-5 text-red-600" />
            <span className="font-semibold">공구반장 : </span>
            <span className="text-gray-600">{userData?.username || '정보 없음'}</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-orange-600" />
            <span className="font-semibold">참여 인원:</span>
            <span className="text-gray-600">
              {data.participants?.length || 0}/{data.maxParticipants}명
            </span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-yellow-600" />
            <span className="font-semibold">마감일:</span>
            <span className="text-gray-600">{new Date(data.deadline).toLocaleDateString()}일</span>
            <span className="text-gray-500">
              ({formatDistanceToNow(new Date(data.deadline), { addSuffix: true, locale: ko })})
            </span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <BanknotesIcon className="w-5 h-5 text-green-600" />
            <span className="font-semibold">예상 가격:</span>
            <span className="text-gray-600">{data.expectedPrice}원</span>
            <span>(조금은 변동이 있을 수도 있습니다 🙏🏼)</span>
          </p>
          <p className="text-gray-700 flex items-center gap-2">
            <TruckIcon className="w-5 h-5 text-blue-600" />
            <span className="font-semibold">배송 방법:</span>
            <span className="text-gray-600">{data.deliveryMethod}</span>
            <ArrowLongRightIcon className="w-5 h-5 text-gray-600" />
            {data.deliveryMethod === '직거래' ? (
              <span className="text-gray-600">{data.direct}</span>
            ) : (
              <span className="text-gray-600">{data.shippingCost}</span>
            )}
          </p>
        </div>

        {userData?.id == userSession?.user.id ? null : (
          <>
            <div className="fixed bottom-6 right-6">
              {isAlreadyParticipated ? (
                <button className="bg-gray-400 text-white px-6 py-3 rounded-full shadow-lg cursor-not-allowed">
                  신청 완료
                </button>
              ) : (
                <button
                  onClick={openModal}
                  className="bg-darkPink text-white px-6 py-3 rounded-full shadow-lg hover:bg-mediumPink">
                  신청하기
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <ParticipationModal
          closeModal={closeModal}
          groupPurchaseId={data.id}
          userId={userSession?.user.id}
          productName={data.title}
          deadline={new Date(data.deadline).toLocaleDateString()}
        />
      )}
    </div>
  );
};

export default GroupPurchaseListDetail;
