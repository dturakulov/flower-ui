export type ScreenId =
  | "onboarding-1"
  | "onboarding-2"
  | "sign-in"
  | "create-account"
  | "home"
  | "product-detail"
  | "explore"
  | "florist-store"
  | "cart"
  | "wishlist"
  | "chat"
  | "call"
  | "profile";

export type CategoryFilter = "All" | "Bouquets" | "Flower" | "Indoor";

export type BouquetSize = "S" | "M" | "L" | "XL";

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: Exclude<CategoryFilter, "All">;
  typeLabel: string;
  price: number;
  rating: number;
  reviewsCount: number;
  sellerName: string;
  sellerRole: string;
  sellerAvatar: string;
  image: string;
  gallery: string[];
  description: string;
  floristId: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  size: BouquetSize;
}

export interface Florist {
  id: string;
  name: string;
  owner: string;
  rating: number;
  priceRange: string;
  location: string;
  distanceKm: number;
  image: string;
  avatar: string;
  mapX: number; // percentage 0-100
  mapY: number; // percentage 0-100
  badgeColor: string;
}

export interface ChatMessage {
  id: string;
  sender: "them" | "me";
  senderName: string;
  text: string;
  time: string;
}
