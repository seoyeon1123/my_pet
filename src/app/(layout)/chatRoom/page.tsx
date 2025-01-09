'use client';

import chatCatDog from '../../../asserts/chat/chatCatDog.jpg';
import { useEffect, useState } from 'react';
import GetChatRoomList from './actions';
import { useSession } from 'next-auth/react';
import { ChatRoom } from '@/types/chatRoom';
import Image from 'next/image';
import Loading from '@/components/Loading';
import ChatBanner from '@/components/chat/ChatBanner';

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태 추가
  const { data } = useSession();

  const userId = data?.user?.id ? Number(data.user.id) : null;

  useEffect(() => {
    if (userId !== null) {
      const fetchChatRooms = async () => {
        setIsLoading(true); // 로딩 시작
        const rooms: ChatRoom[] = await GetChatRoomList(userId);
        setChatRooms(rooms);
        setIsLoading(false); // 로딩 완료
      };

      fetchChatRooms();
    }
  }, [userId]);

  if (!userId) {
    return <div>로그인 정보가 없습니다.</div>; // 로그인되지 않았을 때 처리
  }

  return (
    <>
      <ChatBanner />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">채팅</h1>
        {isLoading ? ( // 로딩 상태 표시
          <div className="flex justify-center items-center h-64">
            <Loading />
          </div>
        ) : (
          <ul className="list-none p-0 m-0">
            {chatRooms.length > 0 ? (
              chatRooms.map((chatRoom) => (
                <li key={chatRoom.id} className="border-b border-gray-200 last:border-none p-4">
                  <a href={`/chatRoom/${chatRoom.id}`} className="flex flex-row justify-between items-center">
                    <div>
                      <div className="text-lg font-semibold text-gray-800">{chatRoom.groupPurchase?.title}</div>
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
                    <div className="text-sm text-gray-500">
                      {new Date(chatRoom.updatedAt).toLocaleTimeString('ko-KR', { hour: 'numeric', minute: 'numeric' })}
                    </div>
                  </a>
                </li>
              ))
            ) : (
              <div className="flex flex-row gap-4 justify-center items-center mt-20">
                <Image src={chatCatDog} alt="cat&dog" width={200} height={200} />
                <div className="flex flex-col gap-2">
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
