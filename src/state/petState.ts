import { atom } from 'recoil';

export interface IPetProps {
  petType: '댕이' | '냥이';
  petName: string;
  petAge: string;
  petGender: string;
  petNeutered: '';
  category: string;
  petBreed: string;
  petOtherBreed: string;
}

export const petAtom = atom<IPetProps>({
  key: 'petState',
  default: {
    petType: '댕이',
    petName: '',
    petAge: '',
    petGender: '',
    petNeutered: '',
    category: '',
    petBreed: '',
    petOtherBreed: '',
  },
});
