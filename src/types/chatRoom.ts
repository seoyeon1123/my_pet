export interface ChatRoom {
  id: number;
  groupPurchase?: {
    title: string;
    image: string;
    reason: string;
    description: string;
  };
  participants: {
    id: number;
    user?: {
      username: string | null;
    };
  }[];
  lastMessage?: string;
  updatedAt: Date;
}

export interface ChatRoomProduct {
  title: string;
  image: string;
  reason: string;
  description: string;
}
