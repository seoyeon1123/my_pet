import { getGroupPurchasesList } from '@/app/(layout)/store/actions';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import Image from 'next/image';
import { formatDateWeek } from '@/lib/utils';
import Link from 'next/link';

const GroupPurchase = () => {
  const { data, isLoading, isError } = useQuery(['groupPurchaseList'], () => getGroupPurchasesList());

  if (isLoading)
    return (
      <div className="flex justify-center items-start h-screen">
        <Loading />
      </div>
    );
  if (isError) return <div className="text-center text-red-500">Error...</div>;

  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      {data?.map((v, index) => (
        <Link
          href={`/store/group_purchase/${v.productId}/${v.id}`}
          key={v.id}
          className={`flex flex-row gap-4 justify-between w-full max-w-[1200px] px-3 py-5 my-2 ${
            index !== data.length - 1 ? 'border-b' : ''
          } border-gray-300`}>
          <div className="flex flex-row xs:flex-col w-full">
            <Image src={v.image} alt={v.title} width={100} height={100} className="rounded-lg mr-4" />
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-row xs:flex-col xs:items-start gap-2 items-center mt-3">
                  <p className="text-sm bg-blue-400 text-white px-2 py-1 rounded-2xl">{v.productCategory}</p>
                  <h1 className="text-xl font-semibold text-gray-800 mb-2">{v.reason}</h1>
                </div>
                <div className="flex items-center ml-auto text-sm">
                  {v.status === 'RECRUITING' && <p className="bg-red-500 text-white px-2 py-1 rounded-full">진행중</p>}
                  {v.status === 'CLOSED' && <p className="bg-gray-500 text-white px-2 py-1 rounded-full">마감</p>}
                </div>
              </div>
              <p className="text-sm text-gray-500 pb-2">{v.title}</p>
              <p className="text-sm text-gray-600 mb-2">마감 시간: {formatDateWeek(v.deadline.toString())}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GroupPurchase;
