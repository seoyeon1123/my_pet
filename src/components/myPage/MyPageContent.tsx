'use client';

import { MyCommunity, MyGroupPurchase, MyJoinGroupPurchase, MyPet, MyPlace } from '@/app/(layout)/myPage/actions';
import { formatToYearMonthDay } from '@/lib/utils';
import { GroupPurchase, Pet, Place, Post } from '@/types/myPage';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading';

const MyPageContent = () => {
  const { data } = useSession();
  const userId = data?.user?.id ? Number(data.user.id) : null;

  const [postFilter, setPostFilter] = useState<'애완견' | '견주' | '전체'>('전체');
  const [placeFilter, setPlaceFilter] = useState<'동물병원' | '애견카페' | '반려동물미용' | '반려견놀이터' | '전체'>(
    '전체',
  );

  const { data: pets, isLoading: petsLoading } = useQuery<Pet[]>(['pets', userId], () => MyPet(userId!), {
    enabled: !!userId,
  });

  const { data: posts, isLoading: postsLoading } = useQuery<Post[]>(['posts', userId], () => MyCommunity(userId!), {
    enabled: !!userId,
  });

  const { data: places, isLoading: placesLoading } = useQuery<Place[]>(['places', userId], () => MyPlace(userId!), {
    enabled: !!userId,
  });

  const { data: groupPurchases, isLoading: groupPurchasesLoading } = useQuery<GroupPurchase[]>(
    ['groupPurchases', userId],
    () => MyGroupPurchase(userId!),
    {
      enabled: !!userId,
    },
  );

  const { data: joinedGroupPurchases, isLoading: joinedGroupPurchasesLoading } = useQuery<GroupPurchase[]>(
    ['joinedGroupPurchases', userId],
    () => MyJoinGroupPurchase(userId!),
    {
      enabled: !!userId,
    },
  );

  // 모든 데이터가 로드되었는지 확인
  const isLoading =
    petsLoading || postsLoading || placesLoading || groupPurchasesLoading || joinedGroupPurchasesLoading;

  // Filtered data based on selected filters
  const filteredPosts = postFilter === '전체' ? posts : posts?.filter((post) => post.isFor === postFilter);
  const filteredPlaces =
    placeFilter === '전체' ? places : places?.filter((place) => place.category.endsWith(placeFilter));

  const filteredJoinedGroupPurchases = joinedGroupPurchases?.filter(
    (joined) => !groupPurchases!.some((created) => created.id === joined.id),
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-start h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 p-4 max-w-7xl mx-auto justify-center items-center py-10 min-h-screen">
      <section className="p-4 flex flex-col justify-between">
        {pets && pets?.length > 0 ? (
          pets.map((pet) => (
            <Link href={`/friends/${pet.id}`} key={pet.id} className="flex flex-col justify-center items-center">
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

      <div className="flex flex-row xs:flex-col sm:flex-col justify-between gap-2 w-full">
        <section className="bg-lightPink p-4 rounded-lg flex flex-col h-[500px] w-full overflow-hidden">
          <h2 className="text-lg font-bold ">댕냥 광장 속 내 광장</h2>
          <div className="flex gap-4 mb-2 sticky top-0  z-10 p-4">
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
                <Link key={post.id} href={`/community/${post.id}`} className="flex flex-col">
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

        <section className="bg-lightPink p-6 rounded-lg flex flex-col justify-start w-full h-[500px] overflow-hidden">
          <h2 className="text-lg font-bold ">댕냥터</h2>
          <div className="grid-cols-5 xs:grid-cols-3 space-x-2 space-y-2 gap-4 mb-2 sticky top-0  z-10 p-4">
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

      <section className="bg-lightPink p-4 rounded-lg flex flex-col w-full h-[500px]">
        <h2 className="text-lg font-bold pb-5 ">내 공동 구매</h2>

        <div className="flex flex-col xl:flex-row xl:items-start xl:gap-8 w-full h-full ">
          {/* 내가 생성한 공동 구매 */}
          <div className="flex-1 overflow-y-auto">
            {groupPurchases && groupPurchases.length > 0 ? (
              groupPurchases.map((groupPurchase) => (
                <Link
                  href={`/store/group_purchase/${groupPurchase.productId}/${groupPurchase.id}`}
                  key={groupPurchase.id}
                  className="flex flex-col mb-4">
                  <h3 className="text-base font-semibold">{groupPurchase.title}</h3>
                  <p className="text-sm text-gray-500">{groupPurchase.description}</p>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-center text-gray-500">생성한 공동 구매가 없습니다.</p>
              </div>
            )}
          </div>

          {/* 구분선 */}
          <div className="hidden xl:block border-l border-neutral-300 h-full mx-4"></div>

          {/* 내가 참여한 공동 구매 (내가 생성한 공동구매 제외) */}
          <div className="flex-1 overflow-y-auto">
            {filteredJoinedGroupPurchases && filteredJoinedGroupPurchases.length > 0 ? (
              filteredJoinedGroupPurchases.map((groupPurchase) => (
                <Link
                  href={`/store/group_purchase/${groupPurchase.productId}/${groupPurchase.id}`}
                  key={groupPurchase.id}
                  className="flex flex-col mb-4">
                  <h3 className="text-base font-semibold">{groupPurchase.title}</h3>
                  <p className="text-sm text-gray-500">{groupPurchase.description}</p>
                </Link>
              ))
            ) : (
              <div className="flex justify-center items-center">
                <p className="text-center text-gray-500">참여한 공동 구매가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyPageContent;
