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
  const { data } = useSession();
  const userId = Number(data?.user.id);

  useEffect(() => {
    const fetchChatRooms = async () => {
      const rooms: ChatRoom[] = await GetChatRoomList(userId);
      setChatRooms(rooms);
    };

    fetchChatRooms();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">참여한 채팅방 목록</h1>
      <ul className="space-y-4">
        {chatRooms.map((chatRoom) => (
          <li
            key={chatRoom.id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow duration-300">
            <a href={`/chatRoom/${chatRoom.id}`} className="flex items-center space-x-4">
              <div className="flex-1">
                {chatRoom.groupPurchase?.title && (
                  <h3 className="text-lg font-semibold text-gray-800">{chatRoom.groupPurchase.title}</h3>
                )}
                <p className="text-sm text-gray-600">{chatRoom.lastMessage || '새로운 메시지'}</p>

                {chatRoom.participants && chatRoom.participants.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    참여자:
                    {chatRoom.participants.map((participant, index) => (
                      <span key={participant.id}>
                        {participant.user?.username || '알 수 없음'}
                        {index < chatRoom.participants.length - 1 ? ', ' : ''}
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
