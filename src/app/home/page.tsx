import db from '@/lib/db';
import getSession from '@/lib/session';
import getPet from './actions';

const HomePage = async () => {
  const user = await getSession();

  // user가 정의되어 있고 id가 존재하는지 확인
  if (!user?.id) {
    return <h1>사용자를 찾을 수 없거나 로그인하지 않았습니다</h1>;
  }

  const pet = await getPet(user.id);

  return (
    <>
      <h1>안녕하세요 {pet?.name}</h1>
    </>
  );
};

export default HomePage;
