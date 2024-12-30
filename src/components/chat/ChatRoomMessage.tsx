'use client';

import { useEffect, useState } from 'react';
import { messageList, sendMessage } from '@/app/(layout)/chatRoom/[id]/actions';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { subscribeToMessages } from '@/lib/chat'; // 실시간 구독 함수

const ChatRoomMessageList = ({ chatRoomId }: { chatRoomId: number }) => {
  const { data: session } = useSession();
  const userId = Number(session?.user.id);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const { data, isLoading, error } = useQuery(['messages', chatRoomId], () => messageList(chatRoomId), {
    enabled: !!chatRoomId,
    onSuccess: (data) => {
      setMessages(data);
      console.log(data);
    },
  });

  useEffect(() => {
    if (!chatRoomId) return;

    const unsubscribe = subscribeToMessages(chatRoomId, (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      unsubscribe();
    };
  }, [chatRoomId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const sentMessage = await sendMessage(chatRoomId, userId, newMessage);
        setMessages((prevMessages) => [...prevMessages, sentMessage]);
        setNewMessage('');
      } catch (error) {
        console.error('메시지 전송 실패:', error);
      }
    }
  };

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  if (isLoading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">오류가 발생했습니다!</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col w-full max-w-7xl mx-auto justify-center items-center bg-white border border-neutral-200 rounded-2xl">
        <div className="flex-grow p-4 space-y-4 chat-container overflow-auto w-full">
          {messages?.map((msg: any) => (
            <div key={msg.id} className={`flex justify-${msg.userId === userId ? 'end' : 'start'} items-start mb-4`}>
              <div
                className={`max-w-xs p-3 rounded-lg shadow ${
                  msg.userId === userId
                    ? 'bg-darkPink text-white rounded-br-none'
                    : 'bg-gray-200 text-black rounded-bl-none'
                }`}>
                {msg.userId !== userId && (
                  <div className="text-xs font-bold text-gray-700 mb-1">
                    {msg.user?.username || '알 수 없는 사용자'}
                  </div>
                )}
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs text-gray-300 mt-1 text-right">
                  {new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="input flex items-center p-4 bg-white border-t w-full">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkPink"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-darkPink text-white rounded-lg hover:bg-darkPink transition">
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomMessageList;
