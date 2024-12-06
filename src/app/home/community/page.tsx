'use client';

import React, { useState } from 'react';
import CommunityBanner from '@/components/community/Banner';
import PostList from '@/components/community/PostList';

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState('견주');
  const [selectedPetType, setSelectedPetType] = useState<string | undefined>(undefined);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <CommunityBanner />
        <div className="flex flex-col m-5">
          <div className="flex flex-row gap-4">
            <div className="flex flex-row justify-center px-4 items-center gap-3 py-3 border border-orange-400 rounded-t-2xl bg-orange-400 *:text-white  relative w-60">
              <button
                className={`text-base font-semibold ${selectedCategory === '견주' ? 'text-white' : 'hover:text-orange-600'}`}
                onClick={() => {
                  setSelectedCategory('견주');
                  setSelectedPetType(undefined);
                }}>
                견주들의 고민
              </button>
              <span> | </span>
              <button
                className={`text-base font-semibold ${selectedCategory === '애완견' ? 'text-white' : 'hover:text-orange-600'}`}
                onClick={() => {
                  setSelectedCategory('애완견');
                  setSelectedPetType(undefined);
                }}>
                애완견의 고민
              </button>
            </div>
            {selectedCategory === '애완견' && (
              <div className="flex flex-row gap-3 justify-center items-end mb-2">
                <button
                  className={`hover:text-orange-600 ${selectedPetType === '댕이' ? 'text-orange-500 font-semibold' : ''}`}
                  onClick={() => setSelectedPetType('댕이')}>
                  강아지
                </button>
                <span> | </span>
                <button
                  className={`hover:text-orange-600 ${selectedPetType === '냥이' ? 'text-orange-500 font-semibold' : ''}`}
                  onClick={() => setSelectedPetType('냥이')}>
                  고양이
                </button>
              </div>
            )}
          </div>
          <PostList isFor={selectedCategory} type={selectedPetType} />
        </div>
      </div>
    </>
  );
};

export default Community;
