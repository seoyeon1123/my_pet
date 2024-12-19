export interface GroupPurchase {
  productId: bigint;
  title: string;
  description: string;
  expectedPrice: number;
  maxParticipants: number;
  deadline: Date;
  reason: string;
  deliveryMethod: string;
  shippingCost: number | null;
}
