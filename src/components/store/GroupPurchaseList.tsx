'use client';
import { useQuery } from 'react-query';
import GetGroupPurchase from '@/app/home/store/group_purchase/[productId]/actions';
import { GroupPurchase } from '@/types/group_purchase';

const GroupPurchaseList = ({ productId }: { productId: string }) => {
  const id = Number(productId);
  const { data, error, isLoading, isError } = useQuery<GroupPurchase[], Error>(['groupPurchase', id], () =>
    GetGroupPurchase(id),
  );

  return (
    <div className="p-6 mx-auto">
      {data && data.length > 0 ? (
        <h2 className="text-2xl font-semibold text-start mb-6">
          <strong className="bg-darkPink px-2 py-1 rounded-full text-white mr-2">{data[0].title}</strong>의 공동 구매
          리스트입니다!
        </h2>
      ) : (
        <h2 className="text-2xl font-semibold text-start mb-6">공동 구매 리스트가 없습니다.</h2>
      )}

      {isLoading && <p className="text-center text-gray-500">Loading...</p>}
      {isError && <p className="text-center text-red-500">Error: {error?.message}</p>}

      <ul className="grid grid-cols-2 gap-2">
        {data?.map((purchase) => (
          <li
            key={purchase.productId.toString()}
            className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-bold text-darkPink">{purchase.description}</h3>
            <p className="text-gray-600">예상금액: {purchase.expectedPrice}</p>
            <p className="text-gray-600">인원: {purchase.maxParticipants}</p>
            <p className="text-gray-600">{new Date(purchase.deadline).toLocaleDateString()}일에 마감합니다!</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupPurchaseList;
