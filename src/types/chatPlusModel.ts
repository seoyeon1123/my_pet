interface Participant {
  invoiceTrackingNumber: string | null;
  invoiceCourier: string | null;
  isHost: boolean;
  user: {
    username: string | null;
  };
}

interface GroupPurchase {
  title: string;
  productId: bigint;
  description: string;
  image: string;
  reason: string;
  participants: Participant[];
  meetingLocation: string | null;
  meetingTime: Date | null;
}

export interface ProductInfoType {
  groupPurchase: GroupPurchase;
  participants: { user: { username: string | null } }[];
}
