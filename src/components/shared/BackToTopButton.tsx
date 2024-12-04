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
    window.addEventListener('scroll', toggleVisibility); // 스크롤 이벤트 리스너 추가

    return () => {
      window.removeEventListener('scroll', toggleVisibility); // 컴포넌트가 unmount될 때 이벤트 제거
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6  p-3 transition duration-300 ease-in-out">
          <ArrowUpCircleIcon className="text-darkPink size-14" />
        </button>
      )}
    </>
  );
};

export default GoToTopButton;
