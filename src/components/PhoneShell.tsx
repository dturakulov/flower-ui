"use client";

import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Wifi,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/app";
import { BottomNav } from "@/components/BottomNav";
import {
  OnboardingOneScreen,
  OnboardingTwoScreen,
} from "@/components/screens/OnboardingScreens";
import {
  CreateAccountScreen,
  SignInScreen,
} from "@/components/screens/AuthScreens";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { ProductDetailScreen } from "@/components/screens/ProductDetailScreen";
import { ExploreMapScreen } from "@/components/screens/ExploreMapScreen";
import { FloristStoreScreen } from "@/components/screens/FloristStoreScreen";
import { CartScreen } from "@/components/screens/CartScreen";
import { ChatScreen } from "@/components/screens/ChatScreen";
import { CallScreen } from "@/components/screens/CallScreen";
import { WishlistScreen } from "@/components/screens/WishlistScreen";
import { ProfileScreen } from "@/components/screens/ProfileScreen";

const DARK_HEADER_SCREENS: ScreenId[] = ["home", "chat", "call", "profile"];
const TAB_BAR_SCREENS: ScreenId[] = ["home", "explore", "wishlist", "profile"];

const SCREEN_GROUPS: {
  group: string;
  items: { id: ScreenId; label: string }[];
}[] = [
  {
    group: "Welcome & Auth",
    items: [
      { id: "onboarding-1", label: "Onboarding 1" },
      { id: "onboarding-2", label: "Onboarding 2" },
      { id: "sign-in", label: "Sign In" },
      { id: "create-account", label: "Create Account" },
    ],
  },
  {
    group: "Shopping & Discovery",
    items: [
      { id: "home", label: "Home" },
      { id: "product-detail", label: "Product Details (360°)" },
      { id: "explore", label: "Explore Map" },
      { id: "florist-store", label: "Florist Storefront" },
    ],
  },
  {
    group: "Cart & Support",
    items: [
      { id: "cart", label: "My Cart" },
      { id: "chat", label: "Florist Chat" },
      { id: "call", label: "Voice / Video Call" },
      { id: "wishlist", label: "Wishlist" },
      { id: "profile", label: "Profile" },
    ],
  },
];

export function PhoneShell() {
  const { activeScreen, navigate, cartItems, wishlistIds, toast, resetDemo } =
    useApp();
  const [panelVisible, setPanelVisible] = useState(true);

  const isDarkStatus = DARK_HEADER_SCREENS.includes(activeScreen);
  const showBottomNav = TAB_BAR_SCREENS.includes(activeScreen);
  const totalCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderScreen = () => {
    switch (activeScreen) {
      case "onboarding-1":
        return <OnboardingOneScreen />;
      case "onboarding-2":
        return <OnboardingTwoScreen />;
      case "sign-in":
        return <SignInScreen />;
      case "create-account":
        return <CreateAccountScreen />;
      case "home":
        return <HomeScreen />;
      case "product-detail":
        return <ProductDetailScreen />;
      case "explore":
        return <ExploreMapScreen />;
      case "florist-store":
        return <FloristStoreScreen />;
      case "cart":
        return <CartScreen />;
      case "chat":
        return <ChatScreen />;
      case "call":
        return <CallScreen />;
      case "wishlist":
        return <WishlistScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center sm:p-5 lg:gap-10 relative overflow-x-hidden">
      {/* Subtle ambient background glow on desktop */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden sm:block fixed inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(111,26,182,0.10),transparent_48%),radial-gradient(circle_at_75%_80%,rgba(249,56,136,0.08),transparent_45%)]"
      />

      {/* iPhone Viewport Frame (Full-bleed on mobile, framed on sm+) */}
      <main className="relative z-10 w-full h-dvh sm:w-[390px] sm:h-[820px] sm:max-h-[92dvh] sm:rounded-[52px] sm:border-[10px] sm:border-[#16161A] sm:shadow-[0_32px_80px_-16px_rgba(38,10,68,0.34)] bg-white flex flex-col overflow-hidden">
        {/* Status Bar + Dynamic Island */}
        <div
          className={`shrink-0 px-6 pt-3 pb-1.5 flex items-center justify-between select-none transition-colors ${
            activeScreen === "call"
              ? "bg-black/45 text-white"
              : isDarkStatus
              ? "bg-[#6F1AB6] text-white"
              : "bg-white text-[#141416]"
          }`}
        >
          <span className="text-[13px] font-bold tracking-tight">9:41</span>

          {/* Dynamic Island */}
          <div
            aria-hidden="true"
            className="hidden sm:flex items-center justify-end px-2.5 w-[104px] h-[26px] rounded-full bg-[#09090B]"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#1C1C24] border border-[#2C2C38]" />
          </div>

          <div className="flex items-center gap-1.5">
            {/* Signal Bars */}
            <div className="flex items-end gap-[1.5px] h-2.5">
              <span className="w-[2.5px] h-1 rounded-xs bg-current" />
              <span className="w-[2.5px] h-1.5 rounded-xs bg-current" />
              <span className="w-[2.5px] h-2 rounded-xs bg-current" />
              <span className="w-[2.5px] h-2.5 rounded-xs bg-current" />
            </div>
            <Wifi className="w-3.5 h-3.5" />
            {/* Battery */}
            <div className="flex items-center gap-0.5">
              <div className="w-[20px] h-[10px] rounded-[3px] border border-current p-[1.5px] flex items-center">
                <div className="w-full h-full rounded-[1px] bg-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Screen Content */}
        <div className="flex-1 min-h-0 flex flex-col relative">
          {renderScreen()}

          {/* Toast Pill */}
          {toast && (
            <div
              role="status"
              aria-live="polite"
              className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-full bg-[#141416]/90 text-white text-[11px] font-semibold shadow-lg whitespace-nowrap"
            >
              {toast}
            </div>
          )}
        </div>

        {/* Bottom Tab Bar */}
        {showBottomNav && <BottomNav />}

        {/* iOS Home Indicator */}
        <div
          aria-hidden="true"
          className={`hidden sm:flex justify-center pb-2 pt-1 shrink-0 ${
            activeScreen === "call" ? "bg-[#240B3B]/90" : "bg-white"
          }`}
        >
          <span
            className={`w-28 h-1 rounded-full ${
              activeScreen === "call" ? "bg-white/40" : "bg-[#141416]/20"
            }`}
          />
        </div>
      </main>

      {/* Desktop Presentation Navigator Panel */}
      {panelVisible ? (
        <aside className="hidden lg:flex flex-col w-[320px] rounded-[28px] bg-white/90 backdrop-blur-md border border-white shadow-xl p-5 space-y-4 z-10">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F4ECFB] text-[#6F1AB6] text-[11px] font-bold mb-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Interactive Client Demo</span>
              </div>
              <h2 className="text-base font-bold text-[#141416]">
                PetalFlow — 1:1 Mobile UI
              </h2>
              <p className="text-xs text-[#7A7A85]">
                Click any screen below or interact inside the phone.
              </p>
            </div>
            <button
              type="button"
              aria-label="Hide presentation panel"
              onClick={() => setPanelVisible(false)}
              className="p-2 rounded-xl bg-[#F5F5F7] hover:bg-[#EBEBF0] text-[#7A7A85] cursor-pointer"
            >
              <EyeOff className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-[#F8F5FC] p-2.5 flex items-center justify-between">
              <span className="text-[#7A7A85]">Cart Items</span>
              <span className="font-bold text-[#6F1AB6] flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5" />
                {totalCart}
              </span>
            </div>
            <div className="rounded-xl bg-[#F8F5FC] p-2.5 flex items-center justify-between">
              <span className="text-[#7A7A85]">Wishlist</span>
              <span className="font-bold text-[#F93888]">
                {wishlistIds.length}
              </span>
            </div>
          </div>

          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {SCREEN_GROUPS.map((group) => (
              <div key={group.group} className="space-y-1.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E99]">
                  {group.group}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {group.items.map((item) => {
                    const active = activeScreen === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => navigate(item.id)}
                        className={`px-2.5 py-2 rounded-xl text-left text-[11.5px] font-semibold transition cursor-pointer ${
                          active
                            ? "bg-[#6F1AB6] text-white shadow-sm"
                            : "bg-[#F5F5F7] text-[#141416] hover:bg-[#EBEBF0]"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={resetDemo}
            className="w-full py-2.5 rounded-xl border border-[#EBEBF0] hover:bg-[#F5F5F7] text-xs font-semibold text-[#141416] flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo to Start</span>
          </button>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setPanelVisible(true)}
          className="hidden lg:flex fixed right-6 bottom-6 z-20 items-center gap-2 px-4 py-2.5 rounded-full bg-[#6F1AB6] text-white text-xs font-semibold shadow-lg hover:bg-[#581294] transition cursor-pointer"
        >
          <Eye className="w-4 h-4" />
          <span>Show Screen Navigator</span>
        </button>
      )}
    </div>
  );
}
