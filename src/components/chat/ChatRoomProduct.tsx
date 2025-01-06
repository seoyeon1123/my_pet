import { ProductInfo } from '@/app/(layout)/chatRoom/[id]/actions';
import { useState } from 'react';
import { useQuery } from 'react-query';

const ChatRoomProduct = ({ chatRoomId }: { chatRoomId: number }) => {
  const { data, error, isLoading } = useQuery(['productInfo', chatRoomId], () => ProductInfo(chatRoomId));

  return (
    <>
      <div className="p-5 flex flex-col justify-start items-start fixed top-0 left-0 z-10 bg-white w-full">
        <h1 className="text-2xl">{data?.groupPurchase.title}</h1>
        <div className="flex flex-row gap-4">
          <h2>참여인원 : </h2>
          {data?.participants.map((v, index) => {
            return <div key={index}>{v.user.username}</div>;
          })}
        </div>
      </div>
    </>
  );
};

export default ChatRoomProduct;
