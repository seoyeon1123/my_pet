'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import mainDog from '../asserts/main/mainDog.png';
import mainCat from '../asserts/main/mainCat.png';

export default function MainComponents() {
  const [isDog, setIsDog] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDog((prev) => !prev);
    }, 3000); // 3초마다 이미지 변경

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-maincolor h-screen">
      {/* MY PAT 텍스트 등장 */}
      <motion.div
        className="text-[300px] text-center font-bold flex flex-row justify-center items-center text-maintext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          M
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Y
        </motion.span>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          &nbsp;P
        </motion.span>

        <motion.div
          key={isDog ? 'dog' : 'cat'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.8 }} // scale을 추가하여 부드럽게 사라지도록
          transition={{
            duration: 1,
            delay: 0.9,
            ease: 'easeInOut',
          }}
          layout
        >
          <Image
            src={isDog ? mainDog : mainCat}
            alt={isDog ? '메인 강아지' : '메인 고양이'}
            width={300}
            height={300}
          />
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          T
        </motion.span>
      </motion.div>

      {/* 메시지 등장 */}
      <div>
        <motion.p
          className="text-2xl mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          우리 아이를 혼자 키우지 마세요!
        </motion.p>
        <motion.p
          className="text-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.4 }}
        >
          다른 PAT들과 함께 키워요 🐶
        </motion.p>
      </div>
    </div>
  );
}
