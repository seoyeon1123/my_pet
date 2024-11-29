import Link from 'next/link';

const MainHeader = () => {
  return (
    <div className="absolute top-4 right-4 flex items-center">
      <Link href="/login">로그인하기</Link>
    </div>
  );
};

export default MainHeader;
