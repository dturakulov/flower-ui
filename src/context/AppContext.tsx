"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import {
  FLORISTS,
  INITIAL_CART_ITEMS,
  INITIAL_CHAT_MESSAGES,
  PRODUCTS,
} from "@/data/mockData";
import {
  BouquetSize,
  CartItem,
  CategoryFilter,
  ChatMessage,
  ScreenId,
} from "@/types/app";

interface AppContextValue {
  activeScreen: ScreenId;
  navigate: (screen: ScreenId) => void;
  goBack: () => void;
  selectedProductId: string;
  openProduct: (productId: string) => void;
  selectedFloristId: string;
  openFloristStore: (floristId: string) => void;
  selectedCategory: CategoryFilter;
  setSelectedCategory: (cat: CategoryFilter) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  cartItems: CartItem[];
  addToCart: (productId: string, size?: BouquetSize) => void;
  updateCartQuantity: (
    productId: string,
    size: BouquetSize,
    delta: number
  ) => void;
  removeFromCart: (productId: string, size: BouquetSize) => void;
  clearCart: () => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  discountAmount: number;
  applyPromoCode: (code: string) => boolean;
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  resetDemo: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeScreen, setActiveScreen] = useState<ScreenId>("home");
  const [, setHistory] = useState<ScreenId[]>(["onboarding-1"]);
  const [selectedProductId, setSelectedProductId] = useState<string>(
    PRODUCTS[0].id
  );
  const [selectedFloristId, setSelectedFloristId] = useState<string>(
    FLORISTS[0].id
  );
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Bouquets");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("New York, USA");
  const [wishlistIds, setWishlistIds] = useState<string[]>([
    "blue-white-bouquets",
  ]);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState<string>("SAVE13");
  const [discountAmount, setDiscountAmount] = useState<number>(13);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 2400);
  }, []);

  const navigate = useCallback(
    (screen: ScreenId) => {
      setHistory((prev) =>
        prev[prev.length - 1] === activeScreen ? prev : [...prev, activeScreen]
      );
      setActiveScreen(screen);
    },
    [activeScreen]
  );

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) {
        setActiveScreen("home");
        return [];
      }
      const next = [...prev];
      const last = next.pop() ?? "home";
      setActiveScreen(last);
      return next;
    });
  }, []);

  const openProduct = useCallback(
    (productId: string) => {
      setSelectedProductId(productId);
      navigate("product-detail");
    },
    [navigate]
  );

  const openFloristStore = useCallback(
    (floristId: string) => {
      setSelectedFloristId(floristId);
      navigate("florist-store");
    },
    [navigate]
  );

  const toggleWishlist = useCallback(
    (productId: string) => {
      setWishlistIds((prev) => {
        const exists = prev.includes(productId);
        showToast(exists ? "Removed from Wishlist" : "Saved to Wishlist");
        return exists
          ? prev.filter((id) => id !== productId)
          : [...prev, productId];
      });
    },
    [showToast]
  );

  const addToCart = useCallback(
    (productId: string, size: BouquetSize = "M") => {
      setCartItems((prev) => {
        const existing = prev.find(
          (item) => item.productId === productId && item.size === size
        );
        if (existing) {
          return prev.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { productId, quantity: 1, size }];
      });
      showToast("Added to Cart");
    },
    [showToast]
  );

  const updateCartQuantity = useCallback(
    (productId: string, size: BouquetSize, delta: number) => {
      setCartItems((prev) =>
        prev
          .map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: Math.max(0, item.quantity + delta) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, size: BouquetSize) => {
      setCartItems((prev) =>
        prev.filter(
          (item) => !(item.productId === productId && item.size === size)
        )
      );
      showToast("Item removed from cart");
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const applyPromoCode = useCallback(
    (raw: string) => {
      const normalized = raw.trim().toUpperCase();
      setPromoCode(normalized);
      if (normalized === "SAVE13" || normalized === "FLOWER13") {
        setDiscountAmount(13);
        showToast("Promo applied: -$13.00");
        return true;
      }
      if (normalized === "FLOWER10" || normalized === "PETAL20") {
        setDiscountAmount(normalized === "PETAL20" ? 20 : 10);
        showToast(
          `Promo applied: -$${normalized === "PETAL20" ? "20.00" : "10.00"}`
        );
        return true;
      }
      if (!normalized) {
        setDiscountAmount(0);
        return false;
      }
      setDiscountAmount(13);
      showToast("Demo promo SAVE13 (-$13.00) applied");
      return true;
    },
    [showToast]
  );

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const nowMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      senderName: "You",
      text: trimmed,
      time: "08:06 pm",
    };
    setMessages((prev) => [...prev, nowMsg]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "them",
          senderName: "Sheila Lemke",
          text: "Got it! Our courier is on the way to your New York address.",
          time: "08:06 pm",
        },
      ]);
    }, 650);
  }, []);

  const resetDemo = useCallback(() => {
    setActiveScreen("onboarding-1");
    setHistory([]);
    setSelectedProductId(PRODUCTS[0].id);
    setSelectedFloristId(FLORISTS[0].id);
    setSelectedCategory("Bouquets");
    setSearchQuery("");
    setLocation("New York, USA");
    setWishlistIds(["blue-white-bouquets"]);
    setCartItems(INITIAL_CART_ITEMS);
    setPromoCode("SAVE13");
    setDiscountAmount(13);
    setMessages(INITIAL_CHAT_MESSAGES);
    showToast("Demo reset to start");
  }, [showToast]);

  const value = useMemo<AppContextValue>(
    () => ({
      activeScreen,
      navigate,
      goBack,
      selectedProductId,
      openProduct,
      selectedFloristId,
      openFloristStore,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      location,
      setLocation,
      wishlistIds,
      toggleWishlist,
      cartItems,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      promoCode,
      setPromoCode,
      discountAmount,
      applyPromoCode,
      messages,
      sendMessage,
      toast,
      showToast,
      resetDemo,
    }),
    [
      activeScreen,
      navigate,
      goBack,
      selectedProductId,
      openProduct,
      selectedFloristId,
      openFloristStore,
      selectedCategory,
      searchQuery,
      location,
      wishlistIds,
      toggleWishlist,
      cartItems,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      promoCode,
      discountAmount,
      applyPromoCode,
      messages,
      sendMessage,
      toast,
      showToast,
      resetDemo,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
