import { petAtom } from '@/state/petState';
import { useRecoilState } from 'recoil';

const catTraits = [
  '독립심 강한',
  '애교 만점',
  '탐구심 많은',
  '사람을 좋아하는',
  '말을 잘 듣는',
  '차분한',
  '장난치는 걸 좋아하는',
  '고집쟁이',
];

const CatTraits = () => {
  const [pet, setPet] = useRecoilState(petAtom);

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
      }

      return { ...prev, petTraits: updatedTraits.filter((trait) => trait !== value) };
    });
  };

  return (
    <>
      <div className="py-5">
        <div className="flex flex-row gap-2 items-center  mb-4">
          <h2 className="text-lg font-semibold ">냥이 성격 선택</h2> <p className="text-sm">( 3개를 선택해주세요 )</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {catTraits.map((trait) => (
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
    </>
  );
};

export default CatTraits;
