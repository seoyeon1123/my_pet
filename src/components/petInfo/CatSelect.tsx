import { petAtom } from '@/state/petState';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

const catBreeds = {
  단모: [
    { value: '페르시안', label: '페르시안' },
    { value: '샴', label: '샴' },
    { value: '브리티시숏헤어', label: '브리티시 숏헤어' },
    { value: '아메리칸숏헤어', label: '아메리칸 숏헤어' },
  ],
  장모: [
    { value: '메인쿤', label: '메인쿤' },
    { value: '래그돌', label: '래그돌' },
    { value: '노르웨이숲고양이', label: '노르웨이 숲 고양이' },
  ],
  아시아계: [
    { value: '뱅갈', label: '뱅갈' },
    { value: '버마', label: '버마' },
  ],
  스핑크스: [{ value: '스핑크스', label: '스핑크스' }],
  기타: [],
};

const CatSelect = () => {
  const setPetState = useSetRecoilState(petAtom);
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof catBreeds>('단모');
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [otherBreed, setOtherBreed] = useState<string>('');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as keyof typeof catBreeds);
    setSelectedBreed('');
    setOtherBreed('');
    setPetState((prevState) => ({
      ...prevState,
      category: e.target.value,
      breed: '',
      otherBreed: '',
    }));
  };

  const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(e.target.value);
    if (e.target.value !== '기타') {
      setOtherBreed('');
    }
    setPetState((prevState) => ({
      ...prevState,
      breed: e.target.value,
    }));
  };

  const handleOtherBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherBreed(e.target.value);
    setPetState((prevState) => ({
      ...prevState,
      otherBreed: e.target.value,
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">냥이의 견종은?</h1>
      <select
        name="petCategory"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="p-2 border rounded-lg w-full mb-4 focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink">
        <option value="">카테고리 선택</option>
        <option value="단모">단모</option>
        <option value="장모">장모</option>
        <option value="아시아계">아시아계</option>
        <option value="스핑크스">스핑크스</option>
      </select>
      {selectedCategory && (
        <>
          <select
            name="petBreed"
            value={selectedBreed}
            onChange={handleBreedChange}
            className="p-2 border rounded-lg w-full focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink">
            <option value="">견종 선택</option>
            {catBreeds[selectedCategory].map((breed) => (
              <option key={breed.value} value={breed.value}>
                {breed.label}
              </option>
            ))}
            {selectedCategory !== '기타' && <option value="기타">기타 (직접 입력)</option>}
          </select>
          {selectedBreed === '기타' && (
            <div className="mt-4">
              <input
                type="text"
                name="petOtherBreed"
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

export default CatSelect;
