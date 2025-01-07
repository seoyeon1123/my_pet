'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import catRun from '../asserts/loading/catRun.png';
import dogRun from '../asserts/loading/dogRun.png';
import { useState } from 'react';

const Loading = () => {
  // 애니메이션 순서를 제어할 상태
  const [animationStage, setAnimationStage] = useState(0);

  // 애니메이션 단계에 따른 상태 변경
  const handleAnimationComplete = () => {
    if (animationStage < 3) {
      setAnimationStage(animationStage + 1);
    } else {
      setAnimationStage(0); // 마지막 애니메이션 후 첫 번째로 돌아가게 설정
    }
  };

  // 애니메이션 변형 설정
  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex gap-4">
        {[catRun, dogRun, catRun, dogRun].map((src, index) => (
          <motion.div
            key={index}
            initial="initial"
            animate={animationStage === index ? 'animate' : 'initial'}
            exit="exit"
            variants={variants}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            onAnimationComplete={handleAnimationComplete}>
            <Image src={src} alt={`loading-${index}`} width={150} height={150} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
