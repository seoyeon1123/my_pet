import { atom } from 'recoil';

export interface IUserProps {
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  id: string;
}

export const userState = atom<IUserProps[]>({
  key: 'userState',
  default: [],
});
