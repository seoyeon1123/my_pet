'use server';

import db from '@/lib/db';

export const sendMessage = async (chatRoomId: number, userId: number, content: string) => {
  const message = await db.message.create({
    data: {
      content,
      userId,
      chatRoomId,
    },
  });

  return message;
};

export const messageList = async (chatRoomId: number) => {
  const messageList = await db.message.findMany({
    where: {
      chatRoomId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    select: {
      content: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });

  return messageList;
};
