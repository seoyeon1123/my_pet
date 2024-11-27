import { atom } from 'recoil';

export interface IUserProps {
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
}

export const userState = atom<IUserProps | null>({
  key: 'userState',
  default: null,
});
