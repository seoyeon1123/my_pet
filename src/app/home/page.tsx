// app/home/page.tsx (서버 컴포넌트로 설정된 홈 페이지)
'use server'; // 서버 컴포넌트임을 명시

import getPet from './actions';

const HomePage = async () => {
  const pet = await getPet();

  return (
    <>
      <h1>안녕하세요 {pet?.name}</h1>
    </>
  );
};

export default HomePage;
