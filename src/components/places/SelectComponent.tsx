// SelectComponent.tsx
import Image from 'next/image';
import boxs from '../../asserts/store/boxs.png';
import share from '../../asserts/store/share.png';

interface SelectComponentProps {
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
}

const SelectComponent = ({ selectedOption, setSelectedOption }: SelectComponentProps) => {
  return (
    <div className="flex flex-row justify-center items-center my-5">
      <p
        onClick={() => setSelectedOption('store')}
        className={`px-3 py-2 rounded-l-full border-2 flex flex-row gap-1 justify-center items-center cursor-pointer ${
          selectedOption === 'store' ? 'border-[#78B3CE] bg-[#78B3CE] text-white' : 'border-[#78B3CE]'
        }`}>
        <Image src={boxs} alt="상자" width={30} height={30} />
        <span> 댕냥 상점</span>
      </p>
      <p
        onClick={() => setSelectedOption('group')}
        className={`px-3 py-2 rounded-r-full border-2 flex flex-row gap-1 justify-center items-center cursor-pointer ${
          selectedOption === 'group' ? 'border-[#78B3CE] bg-[#78B3CE] text-white' : 'border-[#78B3CE]'
        }`}>
        <Image src={share} alt="공유" width={30} height={30} />
        <span>공동 구매</span>
      </p>
    </div>
  );
};

export default SelectComponent;
