'use client';

import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true); // 스크롤이 200px 이상 내려가면 버튼 표시
    } else {
      setIsVisible(false); // 스크롤이 200px 이하일 때 버튼 숨김
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // 부드럽게 상단으로 스크롤
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-4 p-3 transition duration-300 ease-in-out z-50">
          <ArrowUpCircleIcon className="text-darkPink size-14 xs:size-11 sm:size-11" />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
