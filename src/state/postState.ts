import { atom } from 'recoil';

export interface IPostProps {
  title: string;
  content: string;
  isFor: string;
  petname: string | null;
  imageUrl: string;
  petId: string;
}

export const postState = atom({
  key: 'postState', // unique ID (with respect to other atoms/selectors)
  default: {
    title: '',
    content: '',
    isFor: '',
    imageUrl: '',
    petname: '',
    petId: '',
  },
});
