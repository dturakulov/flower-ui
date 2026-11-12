"use client";

import React from "react";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/mockData";

export function WishlistScreen() {
  const { wishlistIds, toggleWishlist, openProduct, addToCart, navigate } =
    useApp();

  const savedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <header className="px-4 pt-3 pb-3 border-b border-[#F2F2F6] flex items-center justify-between">
        <h1 className="text-[17px] font-bold text-[#141416]">My Wishlist</h1>
        <span className="px-2.5 py-0.5 rounded-full bg-[#F4ECFB] text-[#6F1AB6] text-xs font-bold">
          {savedProducts.length} saved
        </span>
      </header>

      <div className="flex-1 overflow-y-auto phone-scroll p-4">
        {savedProducts.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F4ECFB] text-[#6F1AB6] mx-auto flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#141416]">
              No saved bouquets yet
            </p>
            <p className="text-xs text-[#7A7A85]">
              Tap the heart icon on any arrangement to save it here.
            </p>
            <button
              type="button"
              onClick={() => navigate("home")}
              className="px-6 py-2.5 rounded-full bg-[#6F1AB6] text-white text-xs font-semibold cursor-pointer"
            >
              Explore Flowers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {savedProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-2xl border border-[#F0F0F5] p-2 bg-white shadow-xs"
              >
                <div className="relative aspect-square rounded-xl bg-[#F7F7FA] overflow-hidden mb-2">
                  <button
                    type="button"
                    onClick={() => openProduct(product.id)}
                    className="w-full h-full block cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name} from wishlist`}
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#EF4444] text-[#EF4444]" />
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-1">
                    <h2 className="text-[12px] font-bold text-[#141416] truncate">
                      {product.shortName}
                    </h2>
                    <span className="flex items-center gap-0.5 text-[11px] font-semibold">
                      <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                      {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12.5px] font-bold text-[#6F1AB6]">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      aria-label={`Add ${product.name} to cart`}
                      onClick={() => addToCart(product.id, "M")}
                      className="w-7 h-7 rounded-full bg-[#6F1AB6] text-white flex items-center justify-center cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
