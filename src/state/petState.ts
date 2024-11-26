// atoms/petAtom.ts
import { atom } from 'recoil';

export const petAtom = atom({
  key: 'petState', // atom의 고유한 키
  default: {
    petName: '', // 반려동물 이름
    petAge: '', // 반려동물 나이
    petGender: '', // 반려동물 성별
    petNeutered: '', // 중성화 여부
    category: '', // 반려동물 카테고리 (소형견, 중형견, 대형견 등)
    breed: '', // 품종
    otherBreed: '', // 기타 품종 (사용자가 입력한 값)
  },
});
