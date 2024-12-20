export interface GroupPurchase {
  id: number;
  productId: bigint;
  title: string;
  description: string;
  expectedPrice: number;
  maxParticipants: number;
  deadline: Date;
  reason: string;
  deliveryMethod: string;
  shippingCost: number | null;
  participants: {
    email: string;
    groupPurchaseId: number;
  }[];
}
