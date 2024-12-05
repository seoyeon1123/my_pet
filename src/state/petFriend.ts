import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist<PetType[]>(); // 타입을 PetType[]으로 명시

export interface PetType {
  id: number;
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
    name: string;
  };
}

export const petFriendAtom = atom<PetType[]>({
  key: 'petFriendState', // 고유한 key
  default: [],
  effects_UNSTABLE: [persistAtom],
});
