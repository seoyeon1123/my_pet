import { getGroupPurchasesList } from '@/app/(layout)/home/store/actions';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import Image from 'next/image';
import { formatDateWeek } from '@/lib/utils';
import Link from 'next/link';

const GroupPurchase = () => {
  const { data, isLoading, isError } = useQuery(['groupPurchaseList'], () => getGroupPurchasesList());

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  if (isError) return <div className="text-center text-red-500">Error...</div>;

  return (
    <div className="flex flex-col justify-center items-center">
      {data?.map((v) => (
        <Link
          href={`/home/store/group_purchase/${v.productId}/${v.id}`}
          key={v.id}
          className="flex flex-row gap-4 justify-between m-5 w-full max-w-[1200px] p-3">
          <div className="flex flex-row">
            <Image src={v.image} alt={v.title} width={100} height={100} className="rounded-lg mr-4" />
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-center ">
                <p className="text-sm bg-blue-400 text-white px-2 py-1 rounded-2xl">{v.productCategory}</p>
                <h1 className="text-xl font-semibold text-gray-800 mb-2">{v.reason}</h1>
              </div>
              <p className="text-sm text-gray-500 pb-2">{v.title}</p>
              <p className="text-sm text-gray-600 mb-2">마감 시간: {formatDateWeek(v.deadline.toString())}</p>
            </div>
          </div>
          {/* 이 부분에서 양 끝 정렬 */}
          <div className="flex items-center ml-auto">
            {v.status === 'RECRUITING' && <p className="bg-red-500 text-white px-2 py-1 rounded-full">진행중</p>}
            {v.status === 'CLOSED' && <p className="bg-gray-500 text-white px-2 py-1 rounded-full">마감</p>}
          </div>
          <hr className="border-t-4 border-neutral-600 my-4" />
        </Link>
      ))}
    </div>
  );
};

export default GroupPurchase;
