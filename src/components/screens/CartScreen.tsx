"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/mockData";
import { AppDialog } from "@/components/AppDialog";

export function CartScreen() {
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    promoCode,
    discountAmount,
    applyPromoCode,
    goBack,
    navigate,
    openProduct,
  } = useApp();

  const [promoInput, setPromoInput] = useState(promoCode);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const enrichedItems = cartItems
    .map((ci) => {
      const product = PRODUCTS.find((p) => p.id === ci.productId);
      if (!product) return null;
      return { ...ci, product };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subTotal = enrichedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const deliveryCharge = enrichedItems.length > 0 ? 7 : 0;
  const tax = enrichedItems.length > 0 ? 3 : 0;
  const effectiveDiscount =
    enrichedItems.length > 0 ? Math.min(subTotal, discountAmount) : 0;
  const totalCost = Math.max(
    0,
    subTotal + deliveryCharge + tax - effectiveDiscount
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    applyPromoCode(promoInput);
  };

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
        <h1 className="text-[16px] font-bold text-[#141416]">My Cart</h1>
        <div className="w-9" />
      </div>

      {/* Cart Items + Swipe-to-Reveal Delete */}
      <div className="flex-1 overflow-y-auto phone-scroll px-4 py-3 space-y-3">
        {enrichedItems.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-sm font-bold text-[#141416]">
              Your cart is empty
            </p>
            <p className="text-xs text-[#7A7A85]">
              Explore fresh bouquets and add your favorites.
            </p>
            <button
              type="button"
              onClick={() => navigate("home")}
              className="px-6 py-2.5 rounded-full bg-[#6F1AB6] text-white text-xs font-semibold cursor-pointer"
            >
              Browse Flowers
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10.5px] text-[#8E8E99]">
              Tip: Swipe left on an item to reveal delete
            </p>

            <div className="space-y-2.5">
              {enrichedItems.map(({ product, quantity, size }) => (
                <div
                  key={`${product.id}-${size}`}
                  className="swipe-reveal rounded-2xl border border-[#F0F0F5] bg-white shadow-xs"
                >
                  {/* Foreground Cart Item Card */}
                  <div className="swipe-reveal-content bg-white p-2.5 flex items-center gap-3">
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

                    <div className="flex-1 min-w-0">
                      <h2 className="text-[13px] font-bold text-[#141416] truncate">
                        {product.name}
                      </h2>
                      <p className="text-[11px] text-[#8E8E99]">
                        {product.typeLabel} • Size {size}
                      </p>
                      <p className="text-[13px] font-bold text-[#141416] mt-0.5">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Stepper + Accessible Delete */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => updateCartQuantity(product.id, size, -1)}
                        className="w-6 h-6 rounded-md bg-[#F4F4F6] hover:bg-[#E5E5EA] text-[#141416] flex items-center justify-center cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-5 text-center text-xs font-bold text-[#141416]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => updateCartQuantity(product.id, size, 1)}
                        className="w-6 h-6 rounded-md bg-[#6F1AB6] hover:bg-[#581294] text-white flex items-center justify-center cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Swipe-Revealed Pink/Red Trash Action matching screenshot */}
                  <div
                    className="swipe-reveal-panel"
                    role="group"
                    aria-label={`${product.name} actions`}
                  >
                    <button
                      type="button"
                      aria-label={`Delete ${product.name}`}
                      onClick={() => removeFromCart(product.id, size)}
                      className="w-16 bg-[#FCE7EC] hover:bg-[#FBD0DC] text-[#E11D48] flex items-center justify-center cursor-pointer transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form
              onSubmit={handleApplyPromo}
              className="mt-3 flex items-center gap-2 rounded-full bg-[#F5F5F7] p-1.5 pl-4"
            >
              <input
                type="text"
                aria-label="Promo Code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo Code (try SAVE13)"
                className="flex-1 min-w-0 bg-transparent text-xs text-[#141416] placeholder:text-[#8E8E99] outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[#6F1AB6] hover:bg-[#581294] text-white text-xs font-semibold transition cursor-pointer shrink-0"
              >
                Apply
              </button>
            </form>

            {/* Cost Breakdown matching exact My Cart numbers */}
            <div className="pt-2 space-y-2 text-[12.5px]">
              <div className="flex justify-between text-[#7A7A85]">
                <span>Sub-Total</span>
                <span className="font-semibold text-[#141416]">
                  ${subTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#7A7A85]">
                <span>Delivery Charge</span>
                <span className="font-semibold text-[#141416]">
                  ${deliveryCharge.toFixed(2).padStart(5, "0")}
                </span>
              </div>
              <div className="flex justify-between text-[#7A7A85]">
                <span>Tax</span>
                <span className="font-semibold text-[#141416]">
                  ${tax.toFixed(2).padStart(5, "0")}
                </span>
              </div>
              <div className="flex justify-between text-[#7A7A85]">
                <span>Discount</span>
                <span className="font-semibold text-[#16A34A]">
                  -${effectiveDiscount.toFixed(2)}
                </span>
              </div>
              <div className="border-t border-dashed border-[#E2E2EA] pt-2.5 flex justify-between text-[14px] font-bold text-[#141416]">
                <span>Total Cost</span>
                <span>${totalCost.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Checkout CTA */}
      {enrichedItems.length > 0 && (
        <div className="shrink-0 bg-white px-4 pt-2 pb-6 border-t border-[#F2F2F6]">
          <button
            type="button"
            onClick={() => setCheckoutOpen(true)}
            className="w-full py-3.5 rounded-full bg-[#6F1AB6] hover:bg-[#581294] active:scale-[0.99] text-white text-sm font-semibold shadow-md shadow-[#6F1AB6]/25 transition cursor-pointer"
          >
            Proceed to Checkout
          </button>
        </div>
      )}

      {/* Checkout Success Modal */}
      <AppDialog
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        titleId="checkout-dialog-title"
        title="Order Confirmed"
      >
        <div className="text-center space-y-3 py-1">
          <div className="w-12 h-12 rounded-full bg-[#F4ECFB] text-[#6F1AB6] mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <p className="text-sm font-bold text-[#141416]">
            Total Paid: ${totalCost.toFixed(2)}
          </p>
          <p className="text-xs text-[#7A7A85]">
            Your florist is preparing your bouquets for delivery to New York,
            USA.
          </p>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setCheckoutOpen(false);
                clearCart();
                navigate("chat");
              }}
              className="flex-1 py-2.5 rounded-full bg-[#6F1AB6] text-white text-xs font-semibold cursor-pointer"
            >
              Chat with Florist
            </button>
            <button
              type="button"
              onClick={() => {
                setCheckoutOpen(false);
                clearCart();
                navigate("home");
              }}
              className="flex-1 py-2.5 rounded-full bg-[#F5F5F7] text-[#141416] text-xs font-semibold cursor-pointer"
            >
              Back Home
            </button>
          </div>
        </div>
      </AppDialog>
    </div>
  );
}
