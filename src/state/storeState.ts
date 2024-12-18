import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist<IStoreProps>();

export interface IStoreProps {
  link: string;
  image: string;
  thumbnail: string;
  title: string;
  lprice: string;
  mallName: string;
  productId: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

// 상태 정의
export const storeState = atom<IStoreProps>({
  key: 'storeState', // 고유한 키
  default: {
    link: '',
    image: '',
    thumbnail: '',
    title: '',
    lprice: '',
    mallName: '',
    productId: '',
    category1: '',
    category2: '',
    category3: '',
    category4: '',
  },
  effects_UNSTABLE: [persistAtom],
});
