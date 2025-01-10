export interface Place {
  id: string;
  name: string;
  address: string;
  x: string;
  y: string;
  phone: string | undefined;
  place_url?: string;
  category_name?: string;
}

export interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string;
  y: string;
  phone: string | undefined;
  place_url?: string;
  category_name?: string;
}

export interface MarkerPosition {
  id: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
  phone?: string;
  place_url: string | undefined;
  category_name?: string;
}
