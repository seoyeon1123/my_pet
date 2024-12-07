import React from 'react';

interface FilterProps {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  selectedPetType: string | undefined;
  setSelectedPetType: React.Dispatch<React.SetStateAction<string | undefined>>;
  isFilterOpen: boolean;
  toggleFilter: () => void;
}

const Filter: React.FC<FilterProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedPetType,
  setSelectedPetType,
  isFilterOpen,
  toggleFilter,
}) => {
  return (
    <div className="relative w-32">
      <button
        className="flex justify-between items-center w-full px-4 py-2 border border-orange-400 rounded-t-2xl bg-orange-400 text-white font-semibold"
        onClick={toggleFilter}>
        필터
        <span className="ml-2">{isFilterOpen ? '▲' : '▼'}</span>
      </button>
      {isFilterOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-b-xl shadow-md z-10">
          <div className="p-2">
            <button
              className={`w-full text-sm font-semibold px-4 py-2 ${selectedCategory === '견주' ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-100'}`}
              onClick={() => {
                setSelectedCategory('견주');
                setSelectedPetType(undefined);
              }}>
              견주들의 고민
            </button>
            <button
              className={`w-full text-sm font-semibold px-4 py-2 ${selectedCategory === '애완견' ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-100'}`}
              onClick={() => {
                setSelectedCategory('애완견');
                setSelectedPetType(undefined);
              }}>
              애완견의 고민
            </button>

            {selectedCategory === '애완견' && (
              <div className="flex flex-row gap-3 justify-center items-end mb-2">
                <button
                  className={`w-full text-sm font-semibold px-4 py-2 ${selectedPetType === '댕이' ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-100'}`}
                  onClick={() => setSelectedPetType('댕이')}>
                  강아지
                </button>
                <button
                  className={`w-full text-sm font-semibold px-4 py-2 ${selectedPetType === '냥이' ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-100'}`}
                  onClick={() => setSelectedPetType('냥이')}>
                  고양이
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
