import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface PetType {
  imageUrl: string | null;
  name: string;
  type: string;
  age: string;
  category: string;
  breed: string | null;
  gender: string | null;
  neutered: string | null;
  otherBreed: string | null;
  traits: string[];
  reason: string | null;
  user: {
    username: string | null;
  };
}

export const petFriendAtom = atom<PetType[]>({
  key: 'petFriendState', // 고유한 key
  default: [], // 빈 배열로 초기화
  effects_UNSTABLE: [persistAtom],
});
