'use server';

import db from '@/lib/db';
import { tr } from 'date-fns/locale';

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

export const ProductInfo = async (chatRoomId: number) => {
  const chatRoomProduct = await db.chatRoom.findFirst({
    where: {
      id: chatRoomId,
    },
    select: {
      groupPurchase: {
        select: {
          title: true,
          productId: true,
          participants: {
            select: {
              invoiceTrackingNumber: true,
              invoiceCourier: true,
              isHost: true,
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          meetingLocation: true,
          meetingTime: true,
        },
      },
      participants: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  return chatRoomProduct;
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
      chatRoom: {
        select: {
          groupPurchase: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  return messageList;
};

interface IMeetingProps {
  productId: bigint | undefined;
  meetingLocation: string;
  meetingTime: string;
}

export const Meeting = async ({ productId, meetingLocation, meetingTime }: IMeetingProps) => {
  const groupPurchase = await db.groupPurchase.findFirst({
    where: {
      productId: productId,
    },
  });

  if (!groupPurchase) {
    throw new Error('해당 상품에 대한 공동구매를 찾을 수 없습니다.');
  }

  const formattedMeetingTime = new Date(meetingTime).toISOString();

  const addMeeting = await db.groupPurchase.update({
    where: {
      id: groupPurchase.id,
    },
    data: {
      meetingLocation: meetingLocation,
      meetingTime: formattedMeetingTime,
    },
  });

  return addMeeting;
};

interface IInvoiceProps {
  productId: bigint | undefined;
  selectedCourier: string;
  trackingNumber: string;
  recipientId: number | null;
}

export const Invoice = async ({ productId, selectedCourier, trackingNumber, recipientId }: IInvoiceProps) => {
  const groupPurchase = await db.groupPurchase.findFirst({
    where: {
      productId: productId,
    },
  });

  if (!groupPurchase) {
    throw new Error('해당 상품에 대한 공동구매를 찾을 수 없습니다.');
  }
  const participant = await db.groupPurchaseParticipant.findFirst({
    where: {
      groupPurchaseId: groupPurchase.id,
      userId: recipientId!,
    },
  });

  if (!participant) {
    throw new Error('해당 사용자는 이 공동구매에 참여하지 않았습니다.');
  }

  // 송장 정보 업데이트
  const addInvoice = await db.groupPurchaseParticipant.update({
    where: {
      id: participant.id, // 참여자의 ID로 업데이트
    },
    data: {
      invoiceCourier: selectedCourier,
      invoiceTrackingNumber: trackingNumber,
    },
  });

  return addInvoice;
};

interface Participant {
  userId: number;
  username: string | null;
}

export const getChatRoomHosts = async (chatRoomId: number) => {
  const chatRoomParticipants = await db.chatRoomParticipant.findMany({
    where: {
      chatRoomId: chatRoomId,
    },
    select: {
      userId: true,
      user: {
        select: {
          username: true,
        },
      },
      chatRoom: {
        select: {
          groupPurchase: {
            select: {
              participants: {
                select: {
                  isHost: true,
                  userId: true,
                  user: {
                    select: {
                      username: true,
                    },
                  }, // 참여자의 userId를 가져옵니다.
                },
              },
            },
          },
        },
      },
    },
  });

  // 각 채팅방 참여자에 대해 해당 공동구매의 참여자들 중 isHost가 true인 유저와 false인 유저를 구분합니다.
  const hosts: Participant[] = [];
  const nonHosts: Participant[] = [];

  chatRoomParticipants.forEach((participant) => {
    // 채팅방에 참여한 유저의 userId를 통해 해당 공동구매 참여자의 isHost 값을 찾습니다.
    const participantInfo = participant.chatRoom.groupPurchase.participants.find(
      (p) => p.userId === participant.userId,
    );

    if (participantInfo?.isHost) {
      hosts.push({
        userId: participant.userId,
        username: participant.user.username,
      });
    } else {
      nonHosts.push({
        userId: participant.userId,
        username: participant.user.username,
      });
    }
  });

  // 결과 반환
  return {
    hosts,
    nonHosts,
  };
};
