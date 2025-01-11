const Footer = () => {
  return (
    <>
      <footer className="bg-lightPinkbg text-neutral-600 text-center py-6 border-t border-neutral-300  space-y-3 mt-10">
        <div className="flex flex-row xs:flex-col sm:flex-col justify-center items-center text-center gap-2 *:text-sm *:text-neutral-500">
          <span>대표 : 이서연</span> <span className="text-xs xs:hidden sm:hidden"> | </span>{' '}
          <span>이메일 : lsy_0906@naver.com</span>
          <span className="text-xs xs:hidden sm:hidden"> | </span>
          <span>주소 : 서울 강서구 화곡동</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="font-hakgyo text-darkPink text-xl">댕냥살롱</span>
          <p className="text-sm text-neutral-600">© 댕냥살롱 All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
