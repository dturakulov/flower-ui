"use client";

import React from "react";
import { ArrowLeft, Plus, Star } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { FLORISTS, PRODUCTS } from "@/data/mockData";

export function FloristStoreScreen() {
  const { selectedFloristId, goBack, openProduct, addToCart } = useApp();
  const florist =
    FLORISTS.find((f) => f.id === selectedFloristId) ?? FLORISTS[0];

  const storeProducts = PRODUCTS.filter(
    (p) => p.floristId === florist.id || PRODUCTS.indexOf(p) >= 4
  );

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-2 pb-3 flex items-center justify-between border-b border-[#F2F2F6]">
        <button
          type="button"
          aria-label="Go back"
          onClick={goBack}
          className="w-9 h-9 rounded-full border border-[#EBEBF0] flex items-center justify-center text-[#141416] hover:bg-[#F5F5F7] cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <h1 className="text-sm font-bold text-[#141416]">{florist.name}</h1>
          <p className="text-[10.5px] text-[#7A7A85]">Products</p>
        </div>
        <div className="w-9" />
      </div>

      {/* Store Product Rows matching right-side screens in screenshot */}
      <div className="flex-1 overflow-y-auto phone-scroll px-4 py-4 space-y-3">
        <div className="rounded-2xl bg-[#F4ECFB] p-3 flex items-center gap-3">
          <img
            src={florist.image}
            alt={florist.name}
            className="w-12 h-12 rounded-xl object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#141416] truncate">
              {florist.name}
            </p>
            <p className="text-[11px] text-[#7A7A85]">
              By {florist.owner} • {florist.distanceKm} Km away
            </p>
          </div>
          <span className="px-2 py-1 rounded-full bg-white text-[11px] font-bold text-[#141416] flex items-center gap-0.5 shadow-xs">
            <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
            {florist.rating.toFixed(1)}
          </span>
        </div>

        <h2 className="text-sm font-bold text-[#141416] pt-1">Products</h2>

        <div className="space-y-2.5">
          {storeProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-[#F0F0F5] bg-white p-2.5 flex items-center gap-3 shadow-xs hover:border-[#6F1AB6]/40 transition"
            >
              <button
                type="button"
                onClick={() => openProduct(product.id)}
                className="w-16 h-16 rounded-xl bg-[#F7F7FA] p-1.5 shrink-0 cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </button>

              <button
                type="button"
                onClick={() => openProduct(product.id)}
                className="flex-1 min-w-0 text-left cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10.5px] font-semibold text-[#7A7A85]">
                    {product.typeLabel}
                  </span>
                  <span className="text-[10.5px] font-bold text-[#141416] flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-[#FBBF24] text-[#FBBF24]" />
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <h3 className="text-[13.5px] font-bold text-[#141416] truncate">
                  {product.name}
                </h3>
                <p className="text-[13px] font-bold text-[#6F1AB6]">
                  ${product.price.toFixed(2)}
                </p>
              </button>

              <button
                type="button"
                aria-label={`Add ${product.name} to cart`}
                onClick={() => addToCart(product.id, "M")}
                className="w-8 h-8 rounded-full bg-[#6F1AB6] hover:bg-[#581294] text-white flex items-center justify-center shrink-0 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
