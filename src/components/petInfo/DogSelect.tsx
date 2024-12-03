import { petAtom } from '@/state/petState';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const dogBreeds = {
  소형견: [
    { value: 'chihuahua', label: '치와와' },
    { value: 'pomeranian', label: '포메라니안' },
    { value: 'poodle', label: '푸들 (토이 푸들)' },
    { value: 'yorkshire', label: '요크셔 테리어' },
    { value: 'miniature-schnauzer', label: '미니어처 슈나우저' },
  ],
  중형견: [
    { value: 'bichon-frise', label: '비숑 프리제' },
    { value: 'bulldog', label: '불독' },
    { value: 'cocker-spaniel', label: '코커 스패니얼' },
    { value: 'shih-tzu', label: '시추' },
  ],
  대형견: [
    { value: 'golden-retriever', label: '골든 리트리버' },
    { value: 'labrador', label: '래브라도 리트리버' },
    { value: 'german-shepherd', label: '셰퍼드' },
    { value: 'bernese-mountain-dog', label: '버니즈 마운틴 독' },
    { value: 'rottweiler', label: '로트와일러' },
  ],
  테리어견: [
    { value: 'welsh-terrier', label: '웰시 테리어' },
    { value: 'english-terrier', label: '잉글리시 테리어' },
    { value: 'scottish-terrier', label: '스코티시 테리어' },
  ],
  사냥견: [
    { value: 'beagle', label: '비글' },
    { value: 'greyhound', label: '그레이하운드' },
    { value: 'pointer', label: '포인터' },
  ],
  스포츠견: [
    { value: 'collie', label: '콜리' },
    { value: 'australian-shepherd', label: '오스트레일리언 셰퍼드' },
  ],
  희귀견: [
    { value: 'samoyed', label: '사모예드' },
    { value: 'husky', label: '시베리안 허스키' },
  ],
  잡종견: [{ value: 'mixed', label: '믹스견' }],
  기타: [],
};

const DogBreedSelect = () => {
  const setPetState = useSetRecoilState(petAtom);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof dogBreeds | ''>('');
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [otherBreed, setOtherBreed] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as keyof typeof dogBreeds;
    setSelectedCategory(newCategory);
    setSelectedBreed(''); // breed도 초기화
    setOtherBreed(''); // otherBreed도 초기화

    setPetState((prevState) => ({
      ...prevState,
      category: newCategory, // category 저장
      petBreed: '', // breed 초기화
      petOtherBreed: '', // otherBreed 초기화
    }));
  };

  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const breed = e.target.value;
    setSelectedBreed(breed);
    if (breed !== '기타') {
      setOtherBreed('');
    }
    setPetState((prevState) => ({
      ...prevState,
      petBreed: breed,
    }));
  };

  const handleOtherBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const breed = e.target.value;
    setOtherBreed(breed);
    setPetState((prevState) => ({
      ...prevState,
      petOtherBreed: breed,
    }));
  };

  return (
    <div className="py-5">
      <h1 className="text-2xl font-semibold mb-4">댕이의 견종은?</h1>
      <select
        name="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-2 border rounded-lg w-full mb-4 focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink">
        <option value="카테고리 선택">카테고리 선택</option>
        <option value="소형견">소형견</option>
        <option value="중형견">중형견</option>
        <option value="대형견">대형견</option>
        <option value="테리어견">테리어견</option>
        <option value="사냥견">사냥견</option>
        <option value="스포츠견">스포츠견</option>
        <option value="희귀견">희귀견</option>
        <option value="잡종견">잡종견</option>
      </select>

      {selectedCategory && (
        <>
          <select
            name="petBreed"
            value={selectedBreed}
            onChange={handleBreedChange}
            className="p-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink">
            <option value="">견종 선택</option>
            {dogBreeds[selectedCategory] &&
              dogBreeds[selectedCategory].map((breed) => (
                <option key={breed.value} value={breed.value}>
                  {breed.label}
                </option>
              ))}
            <option value="기타">기타 (직접 입력)</option>
          </select>

          {selectedBreed === '기타' && (
            <div className="mt-4">
              <input
                name="petOtherBreed"
                type="text"
                value={otherBreed}
                onChange={handleOtherBreedChange}
                placeholder="견종을 입력해주세요"
                className="p-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DogBreedSelect;
