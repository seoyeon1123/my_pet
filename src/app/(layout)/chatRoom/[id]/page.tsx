'use client';

import ChatRoom from '@/components/chat/ChatRoomMessage';

const ChatRoomMessage = ({ params: { id } }: { params: { id: string } }) => {
  const chatRoomId = Number(id);

  return (
    <>
      <ChatRoom chatRoomId={chatRoomId} />
    </>
  );
};

export default ChatRoomMessage;
