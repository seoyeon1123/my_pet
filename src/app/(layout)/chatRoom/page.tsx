'use client';

import chatCatDog from '../../../asserts/chat/chatCatDog.jpg';
import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { ChatRoom } from '@/types/chatRoom';
import Image from 'next/image';
import Loading from '@/components/Loading';
import ChatBanner from '@/components/chat/ChatBanner';
import Link from 'next/link';
import GetChatRoomList from './actions';

const ChatRoomList = () => {
  const { data } = useSession();
  const userId = data?.user?.id ? Number(data.user.id) : null;

  const {
    data: chatRooms = [],
    isLoading,
    isError,
  } = useQuery<ChatRoom[], Error>(['chatRooms', userId], () => (userId ? GetChatRoomList(userId) : []), {
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  });

  if (!userId) {
    return <div>로그인 정보가 없습니다.</div>;
  }

  if (isError) {
    return <div>채팅 목록을 불러오는 데 오류가 발생했습니다.</div>;
  }

  return (
    <>
      <ChatBanner />
      <div className="max-w-4xl mx-auto p-4 min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">채팅</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <Loading />
          </div>
        ) : (
          <ul className="list-none p-0 m-0">
            {chatRooms?.length > 0 ? (
              chatRooms.map((chatRoom) => (
                <li key={chatRoom.id} className="border-b border-gray-200 last:border-none">
                  <Link href={`/chatRoom/${chatRoom.id}`} className="flex flex-row justify-between items-center">
                    <div>
                      <div className="text-lg xs:text-base sm:text-base font-semibold text-gray-800">
                        {chatRoom.groupPurchase?.title}
                      </div>
                      {chatRoom.participants.length > 0 && (
                        <p className="text-sm text-gray-500 flex flex-row gap-2 mt-1 justify-start items-center">
                          참여자:
                          {chatRoom.participants.map((participant) => (
                            <span key={participant.id} className="bg-darkPink rounded-3xl px-2 py-1 text-white">
                              {participant.user?.username || '알 수 없음'}
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                    <div className="text-sm text-end text-gray-500">
                      {new Date(chatRoom.updatedAt).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric' })}
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <div className="flex flex-row xs:flex-col sm:flex-col gap-4 justify-center items-center mt-20">
                <Image src={chatCatDog} alt="cat&dog" width={200} height={200} />
                <div className="flex flex-col gap-2 sm:text-center xs:text-center">
                  <h1 className="text-3xl font-bold text-darkPink">채팅이 없습니다!</h1>
                  <p>공동구매를 신청하면 채팅창이 열릴거에요! </p>
                </div>
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default ChatRoomList;
