"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Phone,
  RotateCw,
  ShoppingBag,
  Star,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/mockData";
import { BouquetSize } from "@/types/app";

const SIZES: { id: BouquetSize; delta: number }[] = [
  { id: "S", delta: -10 },
  { id: "M", delta: 0 },
  { id: "L", delta: 20 },
  { id: "XL", delta: 35 },
];

export function ProductDetailScreen() {
  const {
    selectedProductId,
    goBack,
    navigate,
    wishlistIds,
    toggleWishlist,
    addToCart,
    openFloristStore,
  } = useApp();

  const product =
    PRODUCTS.find((p) => p.id === selectedProductId) ?? PRODUCTS[0];
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [rotationDeg, setRotationDeg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<BouquetSize>("M");
  const [expandedDesc, setExpandedDesc] = useState(false);

  const liked = wishlistIds.includes(product.id);
  const sizeDelta = SIZES.find((s) => s.id === selectedSize)?.delta ?? 0;
  const totalPrice = Math.max(15, product.price + sizeDelta);

  const activeImage = product.gallery[selectedThumb] ?? product.image;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Top Bar */}
      <div className="px-4 pt-2 pb-2 flex items-center justify-between bg-[#F7F7FA]">
        <button
          type="button"
          aria-label="Go back"
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center text-[#141416] hover:bg-[#F4ECFB] transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <span className="text-sm font-bold text-[#141416]">Product Details</span>

        <button
          type="button"
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => toggleWishlist(product.id)}
          className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              liked ? "fill-[#EF4444] text-[#EF4444]" : "text-[#141416]"
            }`}
          />
        </button>
      </div>

      {/* Scrollable Product Body */}
      <div className="flex-1 overflow-y-auto phone-scroll">
        {/* Hero Image + 360° Interactive Arc */}
        <div className="bg-[#F7F7FA] px-4 pb-4 pt-2 flex flex-col items-center">
          <div className="relative w-full h-[200px] flex items-center justify-center p-2">
            <img
              src={activeImage}
              alt={product.name}
              style={{
                transform: `perspective(600px) rotateY(${rotationDeg}deg)`,
              }}
              className="h-[175px] w-auto max-w-full object-contain transition-transform duration-300"
            />
          </div>

          {/* 360° Ellipse Indicator */}
          <div className="relative w-full max-w-[230px] flex items-center justify-center mt-1 mb-3">
            <div className="w-full h-5 border-b-2 border-[#6F1AB6]/40 rounded-[50%]" />
            <div className="absolute -bottom-2.5 flex items-center gap-1.5 bg-[#6F1AB6] text-white px-2.5 py-0.5 rounded-full shadow-sm">
              <button
                type="button"
                aria-label="Rotate left"
                onClick={() => setRotationDeg((d) => d - 25)}
                className="hover:opacity-80 cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <span className="text-[10px] font-bold flex items-center gap-0.5">
                <RotateCw className="w-2.5 h-2.5" /> 360°
              </span>
              <button
                type="button"
                aria-label="Rotate right"
                onClick={() => setRotationDeg((d) => d + 25)}
                className="hover:opacity-80 cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex items-center justify-center gap-2.5 pt-2">
            {product.gallery.map((thumb, idx) => (
              <button
                key={`${thumb}-${idx}`}
                type="button"
                onClick={() => {
                  setSelectedThumb(idx);
                  setRotationDeg(0);
                }}
                className={`w-13 h-13 rounded-xl bg-white p-1 border-2 transition cursor-pointer overflow-hidden ${
                  selectedThumb === idx
                    ? "border-[#6F1AB6] shadow-sm"
                    : "border-transparent opacity-75 hover:opacity-100"
                }`}
              >
                <img
                  src={thumb}
                  alt={`${product.name} view ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 pt-4 pb-5 space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#7A7A85]">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-[#141416]">
                <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                {product.rating.toFixed(1)}
              </span>
            </div>
            <h1 className="text-[20px] font-bold text-[#141416]">
              {product.name}
            </h1>
          </div>

          {/* Seller Row */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#141416]">Seller</p>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => openFloristStore(product.floristId)}
                className="flex items-center gap-2.5 text-left group cursor-pointer"
              >
                <img
                  src={product.sellerAvatar}
                  alt={product.sellerName}
                  className="w-10 h-10 rounded-full object-cover border border-[#EBEBF0]"
                />
                <div>
                  <p className="text-[13px] font-bold text-[#141416] group-hover:text-[#6F1AB6] transition">
                    {product.sellerName}
                  </p>
                  <p className="text-[11px] text-[#7A7A85]">
                    {product.sellerRole}
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Message florist"
                  onClick={() => navigate("chat")}
                  className="w-9 h-9 rounded-full bg-[#F4ECFB] text-[#6F1AB6] hover:bg-[#6F1AB6] hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Call florist"
                  onClick={() => navigate("call")}
                  className="w-9 h-9 rounded-full bg-[#F4ECFB] text-[#6F1AB6] hover:bg-[#6F1AB6] hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Details Copy */}
          <div className="space-y-1">
            <h2 className="text-[13px] font-bold text-[#141416]">
              Product Details
            </h2>
            <p className="text-[12px] leading-relaxed text-[#7A7A85]">
              {expandedDesc
                ? `${product.description} Includes complimentary flower food packet and handwritten gift note card.`
                : product.description}{" "}
              <button
                type="button"
                onClick={() => setExpandedDesc((e) => !e)}
                className="text-[#6F1AB6] font-semibold underline cursor-pointer"
              >
                {expandedDesc ? "Read less" : "Read more"}
              </button>
            </p>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <h2 className="text-[13px] font-bold text-[#141416]">Size</h2>
            <div className="grid grid-cols-4 gap-2">
              {SIZES.map((s) => {
                const active = selectedSize === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSize(s.id)}
                    className={`py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      active
                        ? "bg-[#6F1AB6] text-white border-[#6F1AB6] shadow-xs"
                        : "bg-[#F5F5F7] text-[#141416] border-transparent hover:border-[#D8D8E0]"
                    }`}
                  >
                    {s.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Price + Add to Cart Bar */}
      <div className="shrink-0 bg-white border-t border-[#EFEFF4] px-4 pt-3 pb-6 flex items-center justify-between gap-4 shadow-[0_-6px_20px_rgba(0,0,0,0.04)]">
        <div>
          <span className="block text-[11px] text-[#7A7A85]">Total Price</span>
          <span className="text-[18px] font-extrabold text-[#141416]">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => {
            addToCart(product.id, selectedSize);
            navigate("cart");
          }}
          className="flex-1 py-3.5 px-5 rounded-full bg-[#6F1AB6] hover:bg-[#581294] active:scale-[0.99] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-[#6F1AB6]/25 transition cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
