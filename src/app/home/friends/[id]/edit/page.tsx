'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DogInfo from '@/components/petInfo/DogInfo';
import CatInfo from '@/components/petInfo/CatInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { petAtom } from '@/state/petState';
import { userState } from '@/state/userState';
import { petFriendAtom } from '@/state/petFriend';
import PetInfoUpdate from './actions';
import { useSession } from 'next-auth/react';

const PetEdit = () => {
  const { id } = useParams();
  const paramsId = Number(id);

  const [petDetail, setPetDetail] = useState<any[]>([]);
  const petFriendData = useRecoilValue(petFriendAtom);

  useEffect(() => {
    setPetDetail(petFriendData);
  }, [petFriendData]);

  const pet = petDetail.find((p) => p.id === paramsId);

  const petState = useRecoilValue(petAtom);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const [petFriend, setPetFriend] = useRecoilState(petFriendAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!petState.petName || !petState.petAge || !petState.petType) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    try {
      if (user) {
        await PetInfoUpdate({ ...petState }, user.name!);

        setPetFriend((prev) => prev.map((p) => (p.id === paramsId ? { ...p, ...petState } : p)));

        alert('반려동물 정보가 수정되었습니다.');
        router.push(`/home/friends`);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '정보 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  if (!pet) {
    return <div>Loading...</div>; // pet 데이터가 없는 경우 로딩 메시지 처리
  }

  return (
    <div className="pt-10 w-full flex flex-col justify-center items-center bg-lightPinkbg p-5">
      <form className="flex flex-col gap-6 lg:w-1/3 xl:w-1/3 p-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-xl font-bold">{pet?.name}에 대해서 수정해주세요!</h2>
        </div>
        {pet?.type === '댕이' ? <DogInfo /> : <CatInfo />}

        <div className="flex justify-between gap-4">
          <button
            className="w-1/3 flex items-center justify-center bg-lightPink rounded-l-xl py-2"
            type="button"
            onClick={() => router.back()}>
            이전
          </button>
          <button
            className="w-2/3 flex items-center justify-center bg-darkPink text-white rounded-r-xl py-2"
            type="submit">
            완료
          </button>
        </div>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      </form>
    </div>
  );
};

export default PetEdit;
