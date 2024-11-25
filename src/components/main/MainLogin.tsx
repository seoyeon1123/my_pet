import Link from 'next/link';
import Input from '../shared/Input';
import Button from '../shared/Button';

const MainLogin = () => {
  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col w-[500px] 
      sm:w-[350px] xs:w-[350px]
      border-2 border-darkPink p-8 rounded-lg shadow-xl space-y-6 bg-white"
      >
        <h1 className="text-4xl font-bold text-center text-darkPink py-6">
          우리 댕냥이들 기다리는 중
        </h1>

        <div className="flex flex-col space-y-4">
          <Input name="username" type="text" placeholder="아이디" error={[]} />

          <Input
            name="password"
            type="password"
            placeholder="비밀번호"
            error={[]}
          />
        </div>

        <Button type="submit" description="로그인" />

        <div className="flex flex-row items-center justify-between text-sm text-gray-600">
          <Link href="/signup" className="hover:text-darkPink">
            회원가입
          </Link>

          <div className="flex gap-2">
            <a href="#" className="hover:text-darkPink">
              아이디 찾기
            </a>
            <p>|</p>
            <a href="#" className="hover:text-darkPink">
              비밀번호 찾기
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MainLogin;
