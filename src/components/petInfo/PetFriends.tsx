import { petAtom } from '@/state/petState';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const reasons = ['산책', '여행', '애견카페'];

const PetFriends = () => {
  const [pet, setPet] = useRecoilState(petAtom);

  useEffect(() => {
    setPet((prev) => ({ ...prev, petReson: '' }));
  }, []);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPet((prev) => ({
      ...prev,
      petReson: value,
    }));
  };

  return (
    <>
      <div className="pt-5">
        <div className="flex flex-row gap-2 items-center mb-4">
          <h2 className="text-lg font-semibold">친구를 구하는 이유</h2>
          <p className="text-sm">(하나만 선택해주세요)</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {reasons.map((reason) => (
            <label
              key={reason}
              className={`flex items-center gap-2 p-2 border rounded-xl cursor-pointer transition ${
                pet.petReson === reason // 단일 값으로 비교
                  ? 'bg-darkPink text-white border-darkPink'
                  : 'border-neutral-300 hover:bg-darkPink hover:text-white'
              }`}>
              <input
                type="radio"
                name="catFriendReason"
                value={reason}
                checked={pet.petReson === reason} // 단일 값으로 비교
                onChange={handleRadioChange}
                className="hidden"
              />
              <span className="text-sm">{reason}</span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default PetFriends;
