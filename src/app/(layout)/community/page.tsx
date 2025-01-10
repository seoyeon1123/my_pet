'use client';

import React, { useState } from 'react';
import CommunityBanner from '@/components/community/Banner';
import PostList from '@/components/community/PostList';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('견주'); // 기본값을 undefined로 설정
  const [selectedPetType, setSelectedPetType] = useState<string | undefined>(undefined);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <CommunityBanner />
        <div className="flex flex-col m-5 w-full max-w-[1200px] p-3">
          <div className="flex flex-col w-full ">
            <div className="flex flex-row gap-4">
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
                          setIsFilterOpen(false);
                        }}>
                        견주들의 고민
                      </button>
                      <button
                        className={`w-full text-sm font-semibold px-4 py-2 ${selectedCategory === '애완견' ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-100'}`}
                        onClick={() => {
                          setSelectedCategory('애완견');
                          setSelectedPetType(undefined);
                          setIsFilterOpen(false);
                        }}>
                        애완견의 고민
                      </button>

                      <button
                        className={`w-full text-sm font-semibold px-4 py-2 ${selectedPetType === '댕이' ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-100'}`}
                        onClick={() => {
                          setSelectedCategory('애완견');
                          setSelectedPetType('댕이');
                          setIsFilterOpen(false); // 필터 닫기
                        }}>
                        강아지
                      </button>
                      <button
                        className={`w-full text-sm font-semibold px-4 py-2 ${selectedPetType === '냥이' ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-100'}`}
                        onClick={() => {
                          setSelectedCategory('애완견');
                          setSelectedPetType('냥이');
                          setIsFilterOpen(false);
                        }}>
                        고양이
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <PostList isFor={selectedCategory!} type={selectedPetType} />
        </div>
      </div>
    </>
  );
};

export default Community;
