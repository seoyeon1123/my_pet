const MainLogin = () => {
  return (
    <div className="flex justify-center items-center">
      <form
        className="flex flex-col w-[500px] 
      sm:w-96 xs:w-96
      border-2 border-darkPink p-8 rounded-lg shadow-xl space-y-6 bg-white"
      >
        <h1 className="text-4xl font-bold text-center text-darkPink py-6">
          우리 댕냥이들 기다리는 중
        </h1>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center gap-2">
            <input
              id="username"
              type="text"
              placeholder="아이디"
              className="px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightGreen focus:border-maincolor transition duration-300 ease-in-out w-full"
            />
          </div>

          <div className="flex flex-row items-center gap-2">
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lightGreen focus:border-maincolor transition duration-300 ease-in-out w-full"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-darkPink text-white py-3 rounded-md hover:bg-lightGreen/90 transition duration-300 ease-in-out"
        >
          로그인
        </button>

        <div className="flex flex-row items-center justify-between text-sm text-gray-600">
          <a href="#" className="hover:text-darkPink">
            회원가입
          </a>
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
