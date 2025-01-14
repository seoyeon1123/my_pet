import { useState, useEffect } from 'react';
import { getGroupPurchasesList } from '@/app/(layout)/store/actions';
import { useQuery } from 'react-query';
import Loading from '../Loading';
import Image from 'next/image';
import { formatDateWeek } from '@/lib/utils';
import Link from 'next/link';

const GroupPurchase = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [statusFilter, setStatusFilter] = useState<'RECRUITING' | 'CLOSED' | 'FAILED' | 'ALL'>('ALL');

  const { data, isLoading, isError } = useQuery(['groupPurchaseList', currentPage], () =>
    getGroupPurchasesList(currentPage, pageSize),
  );

  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusFilterChange = (status: 'RECRUITING' | 'CLOSED' | 'FAILED' | 'ALL') => {
    setStatusFilter(status);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-start h-screen">
        <Loading />
      </div>
    );
  if (isError) return <div className="text-center text-red-500">Error...</div>;

  // 상태 필터링
  const filteredItems = data?.items.filter((item) => {
    if (statusFilter === 'ALL') return true;
    return item.status === statusFilter;
  });

  return (
    <div className="flex flex-col justify-start items-end min-h-screen max-w-[1200px] mx-auto">
      <div className="flex my-4 justify-end ">
        <button
          onClick={() => handleStatusFilterChange('ALL')}
          className={`px-4 py-2 rounded-l-xl ${statusFilter === 'ALL' ? 'bg-[#78B3CE] text-white' : 'bg-gray-200 text-gray-800'} border-r border-gray-300`}>
          전체
        </button>
        <button
          onClick={() => handleStatusFilterChange('RECRUITING')}
          className={`px-4 py-2 ${statusFilter === 'RECRUITING' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} border-r border-gray-300`}>
          진행중
        </button>
        <button
          onClick={() => handleStatusFilterChange('CLOSED')}
          className={`px-4 py-2 ${statusFilter === 'CLOSED' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-800'} border-r border-gray-300`}>
          마감
        </button>
        <button
          onClick={() => handleStatusFilterChange('FAILED')}
          className={`px-4 py-2 rounded-r-xl ${statusFilter === 'FAILED' ? 'bg-gray-300 text-white' : 'bg-gray-200 text-gray-800'}`}>
          실패
        </button>
      </div>

      {/* 리스트 */}
      {filteredItems?.map((v, index) => (
        <Link
          href={`/store/group_purchase/${v.productId}/${v.id}`}
          key={v.id}
          className={`flex flex-row gap-4 justify-between w-full px-3 py-5 my-2 ${
            index !== filteredItems.length - 1 ? 'border-b' : ''
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
                  {v.status === 'FAILED' && <p className="bg-gray-300 text-white px-2 py-1 rounded-full">실패</p>}
                </div>
              </div>
              <p className="text-sm text-gray-500 pb-2">{v.title}</p>
              <p className="text-sm text-gray-600 mb-2">마감 시간: {formatDateWeek(v.deadline.toString())}</p>
            </div>
          </div>
        </Link>
      ))}

      {/* 페이지네이션 */}
      <div className="w-full max-w-[1200px] px-3 py-5 mt-6">
        <div className="text-center">
          <ul className="inline-flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GroupPurchase;
