import { useEffect, useRef, useState } from 'react';
import { getChatRoomHosts, messageList, ProductInfo, sendMessage } from '@/app/(layout)/chatRoom/[id]/actions';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { subscribeToMessages } from '@/lib/chat';
import { IChatRoomMessageProps } from '@/types/chatMessage';
import ChatPlusModal from './ChatPlusModal';

type Participant = {
  userId: number;
  username: string | null;
};

const ChatRoomMessageList = ({ chatRoomId }: { chatRoomId: number }) => {
  const { data: session } = useSession();
  const userId = Number(session?.user.id);

  const [messages, setMessages] = useState<IChatRoomMessageProps[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [hosts, setHosts] = useState<Participant[]>([]); // 주최자 상태 추가
  const [nonHosts, setNonHosts] = useState<Participant[]>([]); // 참여자 상태 추가
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isLoading, error } = useQuery(['messages', chatRoomId], () => messageList(chatRoomId), {
    enabled: !!chatRoomId,
    onSuccess: (data) => {
      setMessages(data);
      console.log(data);
    },
  });

  // getChatRoomHosts 함수 사용하여 주최자와 참여자 구분
  useEffect(() => {
    if (!chatRoomId) return;

    const fetchHosts = async () => {
      const { hosts, nonHosts } = await getChatRoomHosts(chatRoomId);
      setHosts(hosts);
      setNonHosts(nonHosts);
    };

    fetchHosts();
  }, [chatRoomId]);

  useEffect(() => {
    if (!chatRoomId) return;

    const unsubscribe = subscribeToMessages(chatRoomId, (message: IChatRoomMessageProps) => {
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
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}. ${
      ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'][d.getDay()]
    }`;
  };

  const { data } = useQuery(['productInfo', chatRoomId], () => ProductInfo(chatRoomId));

  if (isLoading) {
    return <div className="text-center p-4">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">오류가 발생했습니다!</div>;
  }

  // 주최자인지 확인
  const isHost = hosts.some((host) => host.userId === userId);

  const participants = [
    ...hosts.map((host) => ({
      userId: host.userId,
      chatRoomId,
      productId: data?.groupPurchase.productId,
      isHost: true,
      username: host.username, // 주최자 username 추가
    })),
    ...nonHosts.map((nonHost) => ({
      userId: nonHost.userId,
      chatRoomId,
      productId: data?.groupPurchase.productId,
      isHost: false,
      username: nonHost.username, // 참여자 username 추가
    })),
  ];

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col w-full max-w-4xl mx-auto justify-center items-start bg-white border border-neutral-200 rounded-2xl shadow-lg min-h-screen">
        <div className="p-5 flex flex-col justify-start items-start sticky top-[80px] bg-white w-full z-20 border  ">
          <h1 className="text-2xl font-bold text-gray-800">{data?.groupPurchase.title}</h1>
          <div className="flex flex-row gap-2 mt-2 *:text-sm justify-center items-center">
            <h2 className="font-semibold text-gray-400">참여인원 :</h2>
            {hosts.map((v, index) => (
              <div key={index} className="bg-mediumPink rounded-xl text-white px-2 py-1">
                주최자 {v.username}
              </div>
            ))}
            {nonHosts.map((v, index) => (
              <div key={index} className="bg-gray-200 rounded-xl text-black px-2 py-1">
                {v.username}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow p-4 chat-container overflow-auto w-full flex flex-col justify-end">
          {messages?.map((msg: any, index: number) => {
            const currentDate = formatDate(msg.createdAt);
            const prevDate = index > 0 ? formatDate(messages[index - 1]?.createdAt) : null;

            return (
              <div key={msg.id}>
                {currentDate !== prevDate && (
                  <div className="text-center text-gray-500 text-sm my-2 w-full flex items-center">
                    <div className="flex-grow border-t border-neutral-300 ml-4" />
                    <span className="mx-4">{currentDate}</span>
                    <div className="flex-grow border-t border-neutral-300 mr-4" />
                  </div>
                )}

                <div className={`flex justify-${msg.userId === userId ? 'end' : 'start'} items-end mb-4`}>
                  {msg.userId === userId && (
                    <div className="text-xs text-gray-300 mr-2">
                      {new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  )}
                  <div
                    className={`max-w-xs p-3 rounded-lg shadow ${
                      msg.userId === userId
                        ? 'bg-darkPink text-white rounded-br-none'
                        : 'bg-gray-200 text-black rounded-bl-none'
                    }`}>
                    {msg.userId !== userId && (
                      <div className="text-xs font-bold text-gray-500 mb-1">
                        {msg.user?.username || '알 수 없는 사용자'}
                      </div>
                    )}
                    <div className="text-sm">{msg.content}</div>
                  </div>
                  {msg.userId !== userId && (
                    <div className="text-xs text-gray-300 ml-2">
                      {new Date(msg.createdAt).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
        <div className="input flex items-center p-4 bg-white border-t w-full sticky bottom-0 ">
          {isHost && (
            <ChatPlusModal
              userId={userId}
              chatRoomId={chatRoomId}
              productId={data?.groupPurchase.productId}
              isHost={isHost}
              participants={participants} // participants 추가
            />
          )}
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
