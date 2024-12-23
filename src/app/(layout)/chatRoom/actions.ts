'use server';

import db from '@/lib/db';

const GetChatRoomList = async (userId: number) => {
  const chatRoomList = await db.chatRoom.findMany({
    where: {
      participants: {
        some: {
          userId: userId,
        },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      groupPurchase: {
        select: {
          title: true, // 'select'를 사용하여 'title'만 가져옴
        },
      },
    },
  });

  return chatRoomList;
};

export default GetChatRoomList;
