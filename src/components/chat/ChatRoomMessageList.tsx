'use client';

import { messageList } from '@/app/(layout)/chatRoom/[id]/actions';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';

const ChatRoomMessageList = ({ chatRoomId }: { chatRoomId: number }) => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const {
    data: messages,
    isLoading,
    error,
  } = useQuery(['messages', chatRoomId], () => messageList(chatRoomId), {
    enabled: !!chatRoomId, // chatRoomId가 있을 때만 쿼리 실행
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류가 발생했습니다!</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages?.map((msg: any) => (
          <div key={msg.createdAt} className={`flex ${msg.user.id === userId ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs p-3 rounded-lg ${
                msg.user.id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}>
              <div className="text-sm">{msg.content}</div>
              <div className="text-xs text-gray-500">{msg.user.username}</div>
              <div className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomMessageList;
