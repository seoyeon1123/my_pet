'use client';

import { useEffect, useState } from 'react';
import GetChatRoomList from './actions';
import { useSession } from 'next-auth/react';

interface ChatRoom {
  id: number;
  groupPurchase?: {
    title: string;
  };
  participants: {
    id: number;
    user?: {
      username: string | null;
    };
  }[];
  lastMessage?: string;
  updatedAt: Date;
}

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
    return <div>로딩 중...</div>; // 세션이 로딩 중일 때 처리
  }

  if (!userId) {
    return <div>로그인 정보가 없습니다.</div>; // 로그인되지 않았을 때 처리
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">채팅</h1>
      <ul className="list-none p-0 m-0">
        {chatRooms.map((chatRoom) => (
          <li key={chatRoom.id} className="border-b border-gray-200 p-4">
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
              <div className="text-sm text-gray-500">{new Date(chatRoom.updatedAt).toLocaleTimeString()}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomList;
