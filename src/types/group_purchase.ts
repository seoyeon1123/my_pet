export interface GroupPurchase {
  productId: bigint;
  id: number;
  title: string;
  description: string;
  expectedPrice: number;
  maxParticipants: number;
  deadline: Date;
  reason: string;
  deliveryMethod: string;
  shippingCost: number | null;
  participants: { email: string; groupPurchaseId: number }[];
}
