'use client';

import { petFriendAtom } from '@/state/petFriend';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faO, faX } from '@fortawesome/free-solid-svg-icons';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const PetDetail = () => {
  const { id } = useParams();
  const paramsId = Number(id);
  const petDetail = useRecoilValue(petFriendAtom);
  const pet = petDetail.find((p) => p.id === paramsId);

  const { data: session } = useSession();
  const user = session?.user;

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  if (!pet) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-500">해당 동물을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const canEdit = user?.name === pet.user.name;

  return (
    <div className="flex justify-center items-center p-5">
      <div className="mx-auto mt-10 p-6 flex flex-row gap-6 border-2 border-darkPink rounded-xl xs:flex-col sm:flex-col">
        {canEdit && (
          <Link href={`/friends/${pet.id}/edit`}>
            <PencilSquareIcon className="size-7" />
          </Link>
        )}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold mt-4">
            저는 <strong className="text-darkPink">{pet.name}</strong> 입니다
          </h1>
          <Image
            src={pet.imageUrl!}
            alt={pet.name}
            width={500}
            height={500}
            className="object-cover aspect-square rounded-xl shadow-md"
          />
          <p className="text-gray-500 italic mt-4">{pet.breed}</p>
        </div>

        <div className="grid gap-8 mt-6">
          <div className="text-lg">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 border-gray-300">기본 정보</h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <strong>🐾 종류:</strong> {pet.type === '댕이' ? '강아지' : '고양이'}
              </li>
              <li>
                <strong>🐾 나이:</strong> {pet.age}
              </li>
              <li>
                <strong>🐾 성별:</strong> {pet.gender === '여자' ? '암컷' : '수컷'}
              </li>
              <li>
                <strong className="pr-2">🐾 중성화 여부:</strong>
                {pet.neutered === 'o' ? (
                  <FontAwesomeIcon className="text-red-500" icon={faO} />
                ) : (
                  <FontAwesomeIcon className="text-red-500" icon={faX} />
                )}
              </li>
            </ul>
          </div>

          <div className="text-lg">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 border-gray-300">추가 정보</h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li>
                <strong>🐾 카테고리:</strong> {pet.category}
              </li>

              {pet.otherBreed && (
                <>
                  <li>
                    <strong>🐾 기타 품종:</strong> {pet.otherBreed || '없음'}
                  </li>
                </>
              )}
              <li className="flex sm:flex-col xs:flex-col md:flex-col items-start gap-2">
                <strong>🐾 특징:</strong>
                <div className="flex flex-wrap gap-2">
                  {pet.traits.length > 0
                    ? pet.traits.map((trait, index) => (
                        <span
                          key={index}
                          className="border-2 border-darkPink text-darkPink rounded-lg px-3 py-1 text-sm shadow-sm">
                          {trait}
                        </span>
                      ))
                    : '특징 없음'}
                </div>
              </li>
              <li className="text-lg">
                <strong className="text-darkPink">🐾 {pet.reason}</strong> 을 같이할 친구를 찾아요!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
