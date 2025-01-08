'use client';

import { MyCommunity, MyGroupPurchase, MyJoinGroupPurchase, MyPet, MyPlace } from '@/app/(layout)/home/actions';
import { formatDate, formatDateWeek, formatToYearMonthDay } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Pet {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
}

interface Post {
  id: number;
  imageUrl: string | null;
  title: string;
  isFor: string;
  createdAt: Date;
}

interface Place {
  placeUrl: string | null;
  category: string;
  name: string;
  address: string;
  phone: string | null;
}

interface GroupPurchase {
  id: number;
  reason: string;
  title: string;
  description: string;
  deadline: Date;
  productCategory: string;
  image: string;
  status: string;
}

const HomeMyContent = () => {
  const { data } = useSession();
  const userId = data?.user?.id ? Number(data.user.id) : null;

  const [pets, setPets] = useState<Pet[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [groupPurchases, setGroupPurchases] = useState<GroupPurchase[]>([]);
  const [joinedGroupPurchases, setJoinedGroupPurchases] = useState<GroupPurchase[]>([]);

  const [postFilter, setPostFilter] = useState<'애완견' | '견주' | '전체'>('전체');
  const [placeFilter, setPlaceFilter] = useState<'동물병원' | '애견카페' | '반려동물미용' | '반려견놀이터' | '전체'>(
    '전체',
  );
  const [showCreatedPurchases, setShowCreatedPurchases] = useState(true); // 상태 추가

  useEffect(() => {
    if (!userId) {
      console.error('Invalid userId');
      return;
    }

    const fetchData = async () => {
      const myPets = await MyPet(userId);
      const myPosts = await MyCommunity(userId);
      const myPlaces = await MyPlace(userId);
      const myGroupPurchases = await MyGroupPurchase(userId);
      const myJoinedGroupPurchases = await MyJoinGroupPurchase(userId);

      setPets(myPets || []);
      setPosts(myPosts || []);
      setPlaces(myPlaces || []);
      setGroupPurchases(myGroupPurchases || []);
      setJoinedGroupPurchases(myJoinedGroupPurchases || []);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (postFilter === '전체') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter((post) => post.isFor === postFilter));
    }
  }, [postFilter, posts]);

  useEffect(() => {
    if (placeFilter === '전체') {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(places.filter((place) => place.category.endsWith(placeFilter)));
    }
  }, [placeFilter, places]);

  return (
    <div className="flex flex-col gap-8 p-4 max-w-7xl mx-auto justify-center items-center">
      <section className="p-4 flex flex-col justify-between">
        {pets.length > 0 ? (
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
        <section className="bg-gray-100 p-4 rounded-lg flex flex-col h-[500px] w-full overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">댕냥 광장 속 내 광장</h2>
          <div className="flex gap-4 mb-8">
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
          {filteredPosts.length > 0 ? (
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
        </section>

        <section className="bg-gray-100 p-6 rounded-lg flex flex-col justify-start w-full h-[500px] overflow-y-auto">
          <h2 className="text-lg font-bold mb-4">댕냥터</h2>
          <div className="flex gap-4 mb-8">
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
          {filteredPlaces.length > 0 ? (
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
        </section>
      </div>

      <section className="bg-gray-100 p-4 rounded-lg flex flex-col w-full h-[500px]">
        <h2 className="text-lg font-bold mb-4">내 공동 구매</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowCreatedPurchases(true)}
            className={`px-4 py-2 rounded-lg ${showCreatedPurchases ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
            내가 만든 공동 구매
          </button>
          <button
            onClick={() => setShowCreatedPurchases(false)}
            className={`px-4 py-2 rounded-lg ${!showCreatedPurchases ? 'bg-darkPink text-white' : 'bg-gray-200'}`}>
            내가 참여한 공동 구매
          </button>
        </div>
        {showCreatedPurchases ? (
          groupPurchases.length > 0 ? (
            groupPurchases.map((purchase) => (
              <div key={purchase.id} className="mb-4">
                <img src={purchase.image} alt={purchase.title} className="w-full h-32 object-cover rounded-lg" />
                <h3 className="mt-2">{purchase.title}</h3>
              </div>
            ))
          ) : (
            <p>등록된 공동 구매가 없습니다.</p>
          )
        ) : joinedGroupPurchases.length > 0 ? (
          joinedGroupPurchases.map((purchase) => (
            <div key={purchase.id} className="mb-4 flex flex-row gap-4">
              <Image
                src={purchase.image}
                alt={purchase.title}
                width={80}
                height={80}
                className=" aspect-square rounded-2xl"
              />
              <div>
                <h3 className="mt-2">{purchase.title}</h3>
                {/* {purchase.status === 'RECRUITING' ? (
                  <p className="bg-red-600 text-white px-2 py-1 rounded-full">진행중</p>
                ) : purchase.status === 'CLOSED' ? (
                  <p className="bg-red-600 text-white px-2 py-1 rounded-full">진행중</p>
                ) : (
                  <p>마감</p>
                )} */}
              </div>
            </div>
          ))
        ) : (
          <p>참여한 공동 구매가 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default HomeMyContent;
