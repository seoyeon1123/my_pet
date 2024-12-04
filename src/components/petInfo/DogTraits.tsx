import { petAtom } from '@/state/petState';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';

const dogTraits = [
  '활동적인',
  '사람을 좋아하는',
  '호기심 많은',
  '장난꾸러기',
  '말을 잘 듣는',
  '조용한',
  '애교쟁이',
  '관심을 좋아하는',
];

const DogTraits = () => {
  const [pet, setPet] = useRecoilState(petAtom);

  useEffect(() => {
    // 페이지가 로드될 때마다 petTraits를 초기화
    setPet((prev) => ({ ...prev, petTraits: [] }));
  }, [setPet]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPet((prev) => {
      const updatedTraits = prev.petTraits || [];

      if (checked) {
        if (updatedTraits.length >= 3) {
          alert('최대 3개의 성격만 선택 가능합니다.');
          return prev;
        }
        return { ...prev, petTraits: [...updatedTraits, value] };
      } else {
        return { ...prev, petTraits: updatedTraits.filter((trait) => trait !== value) };
      }
    });
  };

  return (
    <div className="py-5">
      <div className="flex flex-row gap-2 items-center mb-4">
        <h2 className="text-lg font-semibold ">댕이 성격 선택</h2>
        <p className="text-sm">( 3개를 선택해주세요 )</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {dogTraits.map((trait) => (
          <label
            key={trait}
            className={`flex items-center gap-2 p-2 border rounded-xl cursor-pointer transition ${
              pet.petTraits?.includes(trait)
                ? 'bg-darkPink text-white border-darkPink'
                : 'border-neutral-300 hover:bg-darkPink hover:text-white'
            }`}>
            <input
              type="checkbox"
              value={trait}
              checked={pet.petTraits?.includes(trait) || false}
              onChange={handleCheckboxChange}
              className="hidden"
            />
            <span className="text-sm">{trait}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DogTraits;
