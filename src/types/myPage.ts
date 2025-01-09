export interface Pet {
  id: number;
  imageUrl: string;
  name: string;
  type: string;
}

export interface Post {
  id: number;
  imageUrl: string | null;
  title: string;
  isFor: string;
  createdAt: Date;
}

export interface Place {
  placeUrl: string | null;
  category: string;
  name: string;
  address: string;
  phone: string | null;
}

export interface GroupPurchase {
  id: number;
  reason: string;
  title: string;
  description: string;
  deadline: Date;
  productCategory: string;
  image: string;
  status: string;
}
