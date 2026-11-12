"use client";

import React from "react";
import { Compass, Heart, Home, MessageCircle, User } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { ScreenId } from "@/types/app";

const TABS: { id: ScreenId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "explore", label: "Explore", icon: Compass },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "chat", label: "Chat", icon: MessageCircle },
  { id: "profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const { activeScreen, navigate, wishlistIds } = useApp();

  return (
    <nav
      aria-label="Primary navigation"
      className="shrink-0 bg-white border-t border-[#EFEFF4] px-3 pt-2 pb-5 flex items-center justify-around"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeScreen === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => navigate(tab.id)}
            className={`relative flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-xl transition cursor-pointer ${
              isActive
                ? "text-[#6F1AB6]"
                : "text-[#8E8E99] hover:text-[#141416]"
            }`}
          >
            {isActive && (
              <span className="absolute -top-2 w-5 h-1 rounded-full bg-[#6F1AB6]" />
            )}
            <div className="relative">
              <Icon
                className={`w-[20px] h-[20px] ${
                  isActive ? "stroke-[2.3]" : "stroke-[1.8]"
                }`}
              />
              {tab.id === "wishlist" && wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-[#F93888]" />
              )}
            </div>
            <span
              className={`text-[10px] leading-tight ${
                isActive ? "font-semibold" : "font-medium"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
