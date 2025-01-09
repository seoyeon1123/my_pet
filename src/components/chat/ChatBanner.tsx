import Image from 'next/image';
import chatBobble from '../../asserts/chat/chatBobble.png';

const ChatBanner = () => {
  return (
    <>
      <div className="flex flex-col gap-3 justify-center items-center *:text-white bg-[rgba(163,118,211,0.7)] h-52 w-full">
        <div className="flex flex-row  justify-center items-center gap-3 ">
          <h1 className="text-4xl xs:text-xl sm:text-xl ">
            <br className="lg:hidden xl:hidden md:hidden" />
            채팅으로 <br /> 편리하게 <br />
            공동구매를 <br /> 해봐요
          </h1>
          <Image src={chatBobble} alt="hug" width={200} />
        </div>
      </div>
    </>
  );
};

export default ChatBanner;
