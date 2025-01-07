'use client';

import chatCatDog from '../../../asserts/chat/chatCatDog.jpg';
import { useEffect, useState } from 'react';
import GetChatRoomList from './actions';
import { useSession } from 'next-auth/react';
import { ChatRoom } from '@/types/chatRoom';
import Image from 'next/image';

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const { data, status } = useSession();

  const userId = data?.user?.id ? Number(data.user.id) : null;

  useEffect(() => {
    if (userId !== null) {
      const fetchChatRooms = async () => {
        const rooms: ChatRoom[] = await GetChatRoomList(userId);
        setChatRooms(rooms);
      };

      fetchChatRooms();
    }
  }, [userId]);
  if (status === 'loading') {
    return <div>로딩 중...</div>;
  }

  if (!userId) {
    return <div>로그인 정보가 없습니다.</div>; // 로그인되지 않았을 때 처리
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">채팅</h1>
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
          <div className="flex flex-row gap-4 justify-center items-center">
            <Image src={chatCatDog} alt="cat&dog" width={200} height={200} />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold text-darkPink">채팅이 없습니다!</h1>
              <p>공동구매를 신청하면 채팅창이 열릴거에요! </p>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default ChatRoomList;
