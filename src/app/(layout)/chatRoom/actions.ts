'use server';

import db from '@/lib/db';

const GetChatRoomList = async (userId: number) => {
  const chatRoomList = await db.chatRoom.findMany({
    where: {
      participants: {
        some: {
          user: {
            id: userId,
          },
        },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: {
              username: true,
              id: true,
            },
          },
        },
      },
      groupPurchase: {
        select: {
          title: true,
        },
      },
    },
  });

  return chatRoomList;
};

export default GetChatRoomList;
