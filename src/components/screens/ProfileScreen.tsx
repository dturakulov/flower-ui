"use client";

import React from "react";
import {
  ChevronRight,
  CreditCard,
  Heart,
  HelpCircle,
  LogOut,
  MapPin,
  ShoppingBag,
  User,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export function ProfileScreen() {
  const { location, navigate, cartItems, wishlistIds, showToast } = useApp();

  const menuItems = [
    {
      label: "My Orders & Cart",
      sub: `${cartItems.reduce((a, b) => a + b.quantity, 0)} active items`,
      icon: ShoppingBag,
      action: () => navigate("cart"),
    },
    {
      label: "Saved Bouquets",
      sub: `${wishlistIds.length} favorites`,
      icon: Heart,
      action: () => navigate("wishlist"),
    },
    {
      label: "Delivery Address",
      sub: location,
      icon: MapPin,
      action: () => navigate("explore"),
    },
    {
      label: "Payment Methods",
      sub: "Visa •••• 4242",
      icon: CreditCard,
      action: () => showToast("Payment methods verified"),
    },
    {
      label: "Florist Support Chat",
      sub: "Sheila Lemke • Online",
      icon: HelpCircle,
      action: () => navigate("chat"),
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto phone-scroll">
      <div className="bg-[#6F1AB6] text-white px-5 pt-4 pb-6 rounded-b-[26px] flex items-center gap-3.5">
        <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center overflow-hidden shrink-0">
          <User className="w-7 h-7 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-[17px] font-bold truncate">Sarah Jenkins</h1>
          <p className="text-xs text-white/80 truncate">user@example.com</p>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-semibold">
            VIP Flower Club
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={item.action}
              className="w-full rounded-2xl border border-[#F0F0F5] bg-white hover:bg-[#FAF8FD] p-3 flex items-center justify-between gap-3 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#F4ECFB] text-[#6F1AB6] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-[13px] font-bold text-[#141416] truncate">
                    {item.label}
                  </p>
                  <p className="text-[11px] text-[#7A7A85] truncate">
                    {item.sub}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#8E8E99] shrink-0" />
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => navigate("sign-in")}
          className="w-full mt-2 rounded-2xl bg-[#FCE7EC] hover:bg-[#FBD5DF] text-[#E11D48] p-3 flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
