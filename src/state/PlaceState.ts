import { atom } from 'recoil';

export interface IPlaceProps {
  name: string;
  address: string;
  category: string;
  phone: string;
  placeUrl: string;
  latitude: number;
  longitude: number;
  id: number;
}

export const placeState = atom({
  key: 'placeState',
  default: {
    id: '',
    name: '',
    address: '',
    category: '',
    phone: '',
    placeUrl: '',
    latitude: 0,
    longitude: 0,
  },
});
