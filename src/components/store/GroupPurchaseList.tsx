'use client';
import GetGroupPurchase from '@/app/home/store/group_purchase/[productId]/actions';
import { GroupPurchase } from '@/types/group_purchase';
import { CalendarDaysIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useQuery } from 'react-query';
import dogcatIcon from '../../asserts/store/dogcatIcon.png';
import Image from 'next/image';

const GroupPurchaseList = ({ productId }: { productId: string }) => {
  const id = Number(productId);
  const { data, error, isLoading, isError } = useQuery<GroupPurchase[], Error>(['groupPurchase', id], () =>
    GetGroupPurchase(id),
  );

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error?.message}</p>;
  }

  return (
    <div className="p-6 mx-auto">
      {data && data.length > 0 ? (
        <h2 className="text-2xl font-semibold text-start mb-6">
          <strong className="text-darkPink mr-2">{data[0].title}</strong>의 공동 구매 리스트입니다!
        </h2>
      ) : (
        <h2 className="text-2xl font-semibold text-start mb-6">공동 구매 리스트가 없습니다.</h2>
      )}

      <ul className="grid grid-cols-2 gap-4">
        {data?.map((purchase) => (
          <Link
            href={`/home/store/group_purchase/${productId}/${purchase.id}`}
            key={purchase.id}
            className="border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
            <div className="space-y-4">
              <div className="flex flex-row items-center gap-2">
                <Image src={dogcatIcon} alt="dogcatIcon" width={30} height={30} />
                <p className="text-lg font-semibold  rounded-full inline-block">{purchase.reason}</p>
              </div>
              <p className="text-gray-700 text-sm flex items-center">
                <UserIcon className="size-5 text-red-500 mr-2" />
                <span className="font-semibold mr-1">참여 인원 :</span>
                <span>
                  {purchase.participants?.length || 0}/{purchase.maxParticipants}명
                </span>
              </p>

              <p className="text-gray-700 text-sm flex items-center">
                <CalendarDaysIcon className="size-5 text-blue-500 mr-2" />
                <span className="font-semibold mr-1">마감일:</span>
                <span>{new Date(purchase.deadline).toLocaleDateString()}일</span>
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default GroupPurchaseList;
