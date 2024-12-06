import { atom } from 'recoil';

export interface IPostProps {
  title: string;
  content: string;
  isFor: string;
  petname: string;
  petId: string;
  imageUrl: string;
}

export const postState = atom({
  key: 'postState',
  default: {
    title: '',
    content: '',
    isFor: '',
    imageUrl: '',
    petname: '', // null이 아닌 빈 문자열로 초기화
    petId: '', // null이 아닌 빈 문자열로 초기화
  },
});
