// eslint-disable-next-line @typescript-eslint/no-explicit-any

import { useEffect, useRef, useState } from 'react';
import { getChatRoomHosts, messageList, ProductInfo, sendMessage } from '@/app/(layout)/chatRoom/[id]/actions';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { subscribeToMessages } from '@/lib/chat';
import { IChatRoomMessageProps } from '@/types/chatMessage';
import ChatPlusModal from './ChatPlusModal';
import { BellAlertIcon } from '@heroicons/react/24/outline';
import { formatDateWeek } from '@/lib/utils';
import Loading from '../Loading';

type Participant = {
  userId: number;
  username: string | null;
};

const ChatRoomMessageList = ({ chatRoomId }: { chatRoomId: number }) => {
  const { data: session } = useSession();
  const userId = Number(session?.user.id);

  const [messages, setMessages] = useState<IChatRoomMessageProps[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [hosts, setHosts] = useState<Participant[]>([]);
  const [nonHosts, setNonHosts] = useState<Participant[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { isLoading, error } = useQuery(['messages', chatRoomId], () => messageList(chatRoomId), {
    enabled: !!chatRoomId,
    onSuccess: (data) => {
      setMessages(data);
    },
  });

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

  const { data } = useQuery(['productInfo', chatRoomId], () => ProductInfo(chatRoomId));

  const invoiceCourier = data?.groupPurchase.participants.map((v) => v.invoiceCourier);
  const invoiceTrackingNumber = data?.groupPurchase.participants.map((v) => v.invoiceTrackingNumber);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">오류가 발생했습니다!</div>;
  }

  const isHost = hosts.some((host) => host.userId === userId);

  const participants = [
    ...hosts.map((host) => ({
      userId: host.userId,
      chatRoomId,
      productId: data?.groupPurchase.productId,
      isHost: true,
      username: host.username,
    })),
    ...nonHosts.map((nonHost) => ({
      userId: nonHost.userId,
      chatRoomId,
      productId: data?.groupPurchase.productId,
      isHost: false,
      username: nonHost.username,
    })),
  ];

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col w-full max-w-4xl mx-auto justify-center items-start bg-white border border-neutral-200 rounded-2xl shadow-lg min-h-screen">
        <div className="p-5 flex flex-row justify-between items-start sticky top-[80px] bg-white w-full z-20 border">
          <div className="flex flex-col justify-start items-start">
            <h1 className="text-2xl xs:text-base sm:text-base md:text-lg font-bold text-gray-800">
              {data?.groupPurchase.title}
            </h1>
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
          <div className="relative">
            {invoiceCourier || data?.groupPurchase.meetingLocation ? (
              <BellAlertIcon
                className="size-10
                xs:size-8 sm:size-8 text-red-600 hover:animate-pulse transition-transform cursor-pointer m-3"
                onClick={() => setShowNotification(!showNotification)}
              />
            ) : null}
            {showNotification && (
              <div
                className="absolute left-24
                xs:-left-32 sm:-left-32 md:-left-32 lg:-left-32
                xs:top-14 sm:top-14 md:top-14 lg:top-14
              top-0 bg-white border border-neutral-300 shadow-lg rounded-lg p-6 w-80 xs:w-48 sm:w-48 md:w-48 lg:w-60">
                {invoiceCourier &&
                invoiceTrackingNumber &&
                invoiceCourier.some((courier) => courier !== null) &&
                invoiceTrackingNumber.some((tracking) => tracking !== null) ? (
                  <div className="mb-6 *:xs:text-xs">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 flex items-center">
                      <span className="material-icons text-darkPink mr-2"> 배송 정보</span>
                    </h3>
                    <ul className="space-y-2">
                      {invoiceCourier
                        .filter((courier) => courier !== null)
                        .map((courier, idx) => (
                          <li key={idx} className="text-sm text-gray-600 xs:text-xs sm:text-xs">
                            <span className="font-medium text-gray-700">{courier}</span>: {invoiceTrackingNumber[idx]}
                          </li>
                        ))}
                    </ul>
                    <hr className="border border-b border-neutral-300" />
                  </div>
                ) : null}

                {data?.groupPurchase.meetingLocation && data?.groupPurchase.meetingTime ? (
                  <div>
                    <h3 className="font-bold text-lg xs:text-sm sm:text-sm text-gray-800 mb-2 flex items-center">
                      <span className="material-icons text-darkPink mr-2">모임정보</span>
                    </h3>
                    <p className="text-sm text-gray-600 xs:text-xs sm:text-xs">
                      <span className="font-medium text-gray-700">장소:</span> {data.groupPurchase.meetingLocation}
                    </p>
                    <p className="text-sm text-gray-600 xs:text-xs sm:text-xs">
                      <span className="font-medium text-gray-700">시간:</span>{' '}
                      {new Date(data.groupPurchase.meetingTime).toLocaleString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
        <div className="flex-grow p-4 chat-container overflow-auto w-full flex flex-col justify-end">
          {messages?.map((msg: IChatRoomMessageProps, index: number) => {
            const currentDate = formatDateWeek(msg.createdAt);
            const prevDate = index > 0 ? formatDateWeek(messages[index - 1]?.createdAt) : null;

            return (
              <div key={index}>
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
              participants={participants}
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
