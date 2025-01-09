'use client';

import { MyCommunity, MyGroupPurchase, MyJoinGroupPurchase, MyPet, MyPlace } from '@/app/(layout)/myPage/actions';
import { formatDate, formatDateWeek, formatToYearMonthDay } from '@/lib/utils';
import { GroupPurchase, Pet, Place, Post } from '@/types/myPage';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

const MyPageContent = () => {
  const { data } = useSession();
  const userId = data?.user?.id ? Number(data.user.id) : null;

  const [postFilter, setPostFilter] = useState<'애완견' | '견주' | '전체'>('전체');
  const [placeFilter, setPlaceFilter] = useState<'동물병원' | '애견카페' | '반려동물미용' | '반려견놀이터' | '전체'>(
    '전체',
  );
  const [showCreatedPurchases, setShowCreatedPurchases] = useState(true);

  // useQuery hooks for fetching data
  const { data: pets } = useQuery<Pet[]>(['pets', userId], () => MyPet(userId!), {
    enabled: !!userId, // only fetch if userId exists
  });

  const { data: posts } = useQuery<Post[]>(['posts', userId], () => MyCommunity(userId!), {
    enabled: !!userId,
  });

  const { data: places } = useQuery<Place[]>(['places', userId], () => MyPlace(userId!), {
    enabled: !!userId,
  });

  const { data: groupPurchases } = useQuery<GroupPurchase[]>(
    ['groupPurchases', userId],
    () => MyGroupPurchase(userId!),
    {
      enabled: !!userId,
    },
  );

  const { data: joinedGroupPurchases } = useQuery<GroupPurchase[]>(
    ['joinedGroupPurchases', userId],
    () => MyJoinGroupPurchase(userId!),
    {
      enabled: !!userId,
    },
  );

  // Filtered data based on selected filters
  const filteredPosts = postFilter === '전체' ? posts : posts?.filter((post) => post.isFor === postFilter);
  const filteredPlaces =
    placeFilter === '전체' ? places : places?.filter((place) => place.category.endsWith(placeFilter));

  return (
    <div className="flex flex-col gap-8 p-4 max-w-7xl mx-auto justify-center items-center py-10">
      <section className="p-4 flex flex-col justify-between">
        {pets && pets?.length > 0 ? (
          pets.map((pet) => (
            <Link href={`/home/friends/${pet.id}`} key={pet.id} className="flex flex-col justify-center items-center">
              <Image
                src={pet.imageUrl}
                alt={pet.name}
                width={150}
                height={150}
                className="aspect-square rounded-full"
              />
              <div className="flex flex-row justify-center items-center gap-2 mt-2">
                <p className="bg-yellow-500 text-white px-2 py-1 rounded-full ">{pet.type}</p>
                <h3>{pet.name}</h3>
              </div>
            </Link>
          ))
        ) : (
          <p>등록된 강아지가 없습니다.</p>
        )}
      </section>

      <div className="flex flex-row justify-between gap-2 w-full">
        <section className="bg-gray-100 p-4 rounded-lg flex flex-col h-[500px] w-full overflow-hidden">
          <h2 className="text-lg font-bold ">댕냥 광장 속 내 광장</h2>
          <div className="flex gap-4 mb-2 sticky top-0 bg-gray-100 z-10 p-4">
            <button
              onClick={() => setPostFilter('전체')}
              className={`px-4 py-2 rounded-lg ${postFilter === '전체' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              전체
            </button>
            <button
              onClick={() => setPostFilter('애완견')}
              className={`px-4 py-2 rounded-lg ${postFilter === '애완견' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              애완견
            </button>
            <button
              onClick={() => setPostFilter('견주')}
              className={`px-4 py-2 rounded-lg ${postFilter === '견주' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              견주
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredPosts && filteredPosts?.length > 0 ? (
              filteredPosts.map((post, index) => (
                <Link key={post.id} href={`/home/community/${post.id}`} className="flex flex-col">
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-semibold text-gray-800">{post.title}</h3>
                    <p className="text-sm text-gray-500">{formatToYearMonthDay(post.createdAt)}</p>
                  </div>
                  {index !== filteredPosts.length - 1 && <hr className="border-t border-neutral-300 my-2.5" />}
                </Link>
              ))
            ) : (
              <p className="text-gray-500">작성한 글이 없습니다.</p>
            )}
          </div>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg flex flex-col justify-start w-full h-[500px] overflow-hidden">
          <h2 className="text-lg font-bold ">댕냥터</h2>
          <div className="flex gap-4 mb-2 sticky top-0 bg-gray-100 z-10 p-4">
            <button
              onClick={() => setPlaceFilter('전체')}
              className={`px-4 py-2 rounded-lg ${placeFilter === '전체' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              전체
            </button>
            <button
              onClick={() => setPlaceFilter('동물병원')}
              className={`px-4 py-2 rounded-lg ${placeFilter === '동물병원' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              동물병원
            </button>
            <button
              onClick={() => setPlaceFilter('애견카페')}
              className={`px-4 py-2 rounded-lg ${placeFilter === '애견카페' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              애견카페
            </button>
            <button
              onClick={() => setPlaceFilter('반려동물미용')}
              className={`px-4 py-2 rounded-lg ${placeFilter === '반려동물미용' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              반려동물미용
            </button>
            <button
              onClick={() => setPlaceFilter('반려견놀이터')}
              className={`px-4 py-2 rounded-lg ${placeFilter === '반려견놀이터' ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
              반려견놀이터
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredPlaces && filteredPlaces?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlaces.map((place) => (
                  <a href={place.placeUrl!} key={place.name} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
                          <p className="text-sm text-gray-600">{place.address}</p>
                        </div>
                        <p className="text-sm text-neutral-400">{place.phone}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">저장된 장소가 없습니다.</p>
            )}
          </div>
        </section>
      </div>

      <section className="bg-gray-100 p-4 rounded-lg flex flex-col w-full h-[500px]">
        <h2 className="text-lg font-bold ">내 공동 구매</h2>
        <div className="flex flex-row gap-4">
          {/* 내가 만든 공동구매 */}
          <div className="w-full md:w-1/2 p-4 border-r ">
            <h2 className="text-lg font-semibold mb-4 bg-darkPink rounded-2xl text-white inline-block px-2 py-1">
              내가 만든 공동구매
            </h2>
            {groupPurchases && groupPurchases?.length > 0 ? (
              groupPurchases.map((purchase) => (
                <div key={purchase.id} className="mb-4 overflow-y-auto">
                  <img src={purchase.image} alt={purchase.title} className="w-full h-32 object-cover rounded-lg" />
                  <h3 className="mt-2">{purchase.title}</h3>
                </div>
              ))
            ) : (
              <p>등록된 공동 구매가 없습니다.</p>
            )}
          </div>

          {/* 내가 참여한 공동구매 */}
          <div className="w-full md:w-1/2 p-4 ">
            <h2 className="text-lg font-semibold mb-4 bg-darkPink rounded-2xl text-white inline-block px-2 py-1">
              내가 참여한 공동구매
            </h2>
            {joinedGroupPurchases && joinedGroupPurchases?.length > 0 ? (
              joinedGroupPurchases.map((purchase) => (
                <div key={purchase.id} className="mb-4 flex flex-row gap-4 overflow-y-auto">
                  <Image
                    src={purchase.image}
                    alt={purchase.title}
                    width={80}
                    height={80}
                    className="aspect-square rounded-2xl"
                  />
                  <div>
                    <h3 className="mb-2">{purchase.title}</h3>
                    {purchase.status === 'RECRUITING' ? (
                      <p className="bg-red-600 text-white text-sm px-2 py-1 rounded-full inline-block">진행중</p>
                    ) : purchase.status === 'CLOSED' ? (
                      <p className="bg-gray-500 text-white text-sm px-2 py-1 rounded-full inline-block">종료</p>
                    ) : (
                      <p className="bg-green-500 text-white text-sm px-2 py-1 rounded-full inline-block">완료</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>참여한 공동 구매가 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPageContent;
