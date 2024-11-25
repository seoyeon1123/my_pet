import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';

const SignUp = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center bg-lightPinkbg">
        <form className="flex flex-col gap-10  w-1/3">
          <h1 className="text-2xl font-bold text-center text-darkPink py-6 font-hakgyo">
            댕냥살롱
          </h1>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">회원가입</h2>
            <p>
              본인의 이름과 휴대전화번호 및 이메일을 모두 정확하게 입력해
              주세요.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <Input name="name" type="text" placeholder="이름" error={[]} />
            <Input
              name="phone"
              type="text"
              placeholder="휴대전화번호"
              error={[]}
            />
            <Input name="email" type="email" placeholder="email" error={[]} />
          </div>
          <hr className="borderborder-gray-500" />

          <div className="flex flex-col gap-4">
            <p>인증번호</p>
            <Button type="button" description="인증번호 전송" />
            <Input
              name="verification"
              type="text"
              placeholder="인증번호"
              error={[]}
            />
          </div>

          <div className="flex flex-row justify-between">
            <Link href="/" className="w-1/3 text-center">
              이전
            </Link>
            <button className="w-2/3">다음</button>
          </div>
        </form>
      </div>
    </>
  );
};
export default SignUp;
