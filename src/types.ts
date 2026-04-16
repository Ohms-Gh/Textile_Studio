export interface Fabric {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  description: string;
  fiber: string;
  weight: string;
  width: string;
  colors: string[];
  care: string;
  opacity: string;
  drape: string;
  isPremium?: boolean;
}

export interface Moodboard {
  id: string;
  name: string;
  modified: string;
  itemCount: number;
  images: string[];
  isShared?: boolean;
}

export interface CartItem {
  fabric: Fabric;
  quantity: number;
}

export type Screen = 'home' | 'browse' | 'details' | 'cart' | 'checkout' | 'confirmation' | 'tracking' | 'moodboards' | 'profile';
