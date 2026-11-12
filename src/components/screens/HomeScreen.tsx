"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Heart,
  MapPin,
  ScanLine,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { LOCATIONS, PRODUCTS, SPECIAL_OFFERS } from "@/data/mockData";
import { CategoryFilter } from "@/types/app";
import { AppDialog } from "@/components/AppDialog";

const CATEGORIES: CategoryFilter[] = ["All", "Bouquets", "Flower", "Indoor"];

export function HomeScreen() {
  const {
    location,
    setLocation,
    navigate,
    openProduct,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wishlistIds,
    toggleWishlist,
    cartItems,
    showToast,
  } = useApp();

  const [activeSlide, setActiveSlide] = useState(0);
  const [locationOpen, setLocationOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const pendingTargetRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const totalCartQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCat =
      selectedCategory === "All" || product.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.sellerName.toLowerCase().includes(q);
    const matchesRating = product.rating >= minRating;
    return matchesCat && matchesSearch && matchesRating;
  });

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    pendingTargetRef.current = index;
    setActiveSlide(index);
    const slideEl = track.children[index] as HTMLElement | undefined;
    if (slideEl) {
      track.scrollTo({
        left: slideEl.offsetLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      if (pendingTargetRef.current !== null) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const width = track.clientWidth || 1;
        const idx = Math.round(track.scrollLeft / width);
        setActiveSlide((prev) =>
          prev === idx ? prev : Math.max(0, Math.min(idx, SPECIAL_OFFERS.length - 1))
        );
      });
    };

    const handleSettle = () => {
      pendingTargetRef.current = null;
      const width = track.clientWidth || 1;
      const idx = Math.round(track.scrollLeft / width);
      setActiveSlide(Math.max(0, Math.min(idx, SPECIAL_OFFERS.length - 1)));
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    track.addEventListener("scrollend", handleSettle);
    return () => {
      track.removeEventListener("scroll", handleScroll);
      track.removeEventListener("scrollend", handleSettle);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto phone-scroll bg-white">
      {/* Purple Curved Top Header */}
      <header className="bg-[#6F1AB6] text-white px-4 pt-2 pb-5 rounded-b-[24px]">
        <div className="flex items-center justify-between mb-3.5">
          <button
            type="button"
            onClick={() => setLocationOpen(true)}
            className="text-left group cursor-pointer"
          >
            <span className="block text-[10px] text-white/75 font-medium">
              Location
            </span>
            <span className="flex items-center gap-1 text-[13px] font-semibold">
              <MapPin className="w-3.5 h-3.5 text-[#F93888] fill-[#F93888]" />
              <span>{location}</span>
              <ChevronDown className="w-3.5 h-3.5 text-white/80 group-hover:translate-y-0.5 transition" />
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Open cart (${totalCartQty} items)`}
              onClick={() => navigate("cart")}
              className="relative w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer"
            >
              <ShoppingCart className="w-[17px] h-[17px]" />
              {totalCartQty > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-[#F93888] text-[9px] font-bold flex items-center justify-center">
                  {totalCartQty}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setNotifOpen(true)}
              className="relative w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer"
            >
              <Bell className="w-[17px] h-[17px]" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#F93888]" />
            </button>
          </div>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 min-w-0 bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 text-[#141416] shadow-sm">
            <Search className="w-4 h-4 text-[#7A7A85] shrink-0" />
            <input
              type="search"
              aria-label="Search flowers"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="w-full min-w-0 bg-transparent text-[13px] text-[#141416] placeholder:text-[#8E8E99] outline-none"
            />
            <button
              type="button"
              aria-label="Scan bouquet QR"
              onClick={() => showToast("Visual bouquet scanner ready")}
              className="text-[#6F1AB6] hover:opacity-80 cursor-pointer shrink-0"
            >
              <ScanLine className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            aria-label="Filter products"
            onClick={() => setFilterOpen(true)}
            className="w-[42px] h-[42px] rounded-xl bg-white text-[#6F1AB6] flex items-center justify-center shadow-sm hover:bg-[#F8F5FC] transition shrink-0 cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="px-4 pt-4 pb-6 space-y-5">
        {/* Special Offers Carousel */}
        <section
          aria-roledescription="carousel"
          aria-label="Special Offers"
          className="space-y-2.5"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#141416]">
              Special Offers
            </h2>
            <button
              type="button"
              onClick={() => navigate("florist-store")}
              className="text-xs font-semibold text-[#6F1AB6] hover:underline cursor-pointer"
            >
              See All
            </button>
          </div>

          <div
            ref={trackRef}
            tabIndex={0}
            role="group"
            aria-label="Offer slides"
            className="carousel-track rounded-2xl"
          >
            {SPECIAL_OFFERS.map((offer, idx) => (
              <div
                key={offer.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${SPECIAL_OFFERS.length}`}
                className="relative rounded-2xl bg-[#F4F4F6] overflow-hidden flex items-center justify-between p-4 min-h-[132px]"
              >
                <div className="z-10 space-y-1.5 max-w-[58%]">
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white text-[9.5px] font-semibold text-[#141416] shadow-xs">
                    {offer.tag}
                  </span>
                  <p className="text-[13.5px] font-bold text-[#141416] leading-tight">
                    {offer.title}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[11px] text-[#7A7A85]">Up to</span>
                    <span className="text-[26px] font-extrabold text-[#141416] leading-none">
                      {offer.discount}
                    </span>
                    <span className="text-xs font-bold text-[#6F1AB6]">
                      {offer.unit}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openProduct(offer.targetProductId)}
                    className="mt-1 px-3.5 py-1.5 rounded-full bg-[#6F1AB6] hover:bg-[#581294] text-white text-[11px] font-semibold shadow-sm transition cursor-pointer"
                  >
                    {offer.cta}
                  </button>
                </div>

                <div className="w-[125px] h-[125px] shrink-0 rounded-full overflow-hidden -mr-2 bg-white/60">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <nav
            aria-label="Choose an offer slide"
            className="flex items-center justify-center gap-1.5 pt-0.5"
          >
            {SPECIAL_OFFERS.map((offer, idx) => (
              <button
                key={offer.id}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={activeSlide === idx ? "true" : undefined}
                onClick={() => goToSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  activeSlide === idx
                    ? "w-4 bg-[#6F1AB6]"
                    : "w-1.5 bg-[#D8D8E0]"
                }`}
              />
            ))}
          </nav>
        </section>

        {/* Recommended For You */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[15px] font-bold text-[#141416]">
              Recommended For You
            </h2>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="text-xs font-semibold text-[#6F1AB6] hover:underline cursor-pointer"
            >
              See All
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto phone-scroll pb-0.5">
            {CATEGORIES.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition whitespace-nowrap cursor-pointer ${
                    active
                      ? "bg-[#6F1AB6] text-white shadow-sm shadow-[#6F1AB6]/25"
                      : "bg-[#F5F5F7] text-[#141416] hover:bg-[#EBEBF0]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 2-Column Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-[#F8F8FA] p-6 text-center space-y-2">
              <p className="text-xs font-medium text-[#7A7A85]">
                No bouquets match your filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setMinRating(0);
                }}
                className="text-xs font-semibold text-[#6F1AB6] underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => {
                const liked = wishlistIds.includes(product.id);
                return (
                  <article
                    key={product.id}
                    className="group rounded-2xl bg-white border border-[#F0F0F5] p-2 shadow-xs hover:shadow-md transition"
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
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition duration-300"
                        />
                      </button>
                      <button
                        type="button"
                        aria-label={
                          liked
                            ? `Remove ${product.name} from wishlist`
                            : `Save ${product.name} to wishlist`
                        }
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center transition hover:scale-105 cursor-pointer"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            liked
                              ? "fill-[#EF4444] text-[#EF4444]"
                              : "text-[#9A9AA6]"
                          }`}
                        />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => openProduct(product.id)}
                      className="w-full text-left space-y-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="text-[12px] font-bold text-[#141416] truncate">
                          {product.shortName}
                        </h3>
                        <span className="flex items-center gap-0.5 text-[11px] font-semibold text-[#141416] shrink-0">
                          <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-[12.5px] font-bold text-[#6F1AB6]">
                        ${product.price.toFixed(2)}
                      </p>
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* Location Picker Dialog */}
      <AppDialog
        open={locationOpen}
        onClose={() => setLocationOpen(false)}
        titleId="location-dialog-title"
        title="Delivery Location"
      >
        <div className="space-y-2">
          {LOCATIONS.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => {
                setLocation(loc);
                setLocationOpen(false);
                showToast(`Location set to ${loc}`);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                location === loc
                  ? "bg-[#F4ECFB] text-[#6F1AB6] font-semibold"
                  : "bg-[#F5F5F7] text-[#141416] hover:bg-[#EBEBF0]"
              }`}
            >
              <span>{loc}</span>
              {location === loc && (
                <span className="w-2 h-2 rounded-full bg-[#6F1AB6]" />
              )}
            </button>
          ))}
        </div>
      </AppDialog>

      {/* Notifications Dialog */}
      <AppDialog
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        titleId="notif-dialog-title"
        title="Notifications"
      >
        <div className="space-y-2.5 text-xs">
          <div className="p-3 rounded-xl bg-[#F4ECFB]">
            <p className="font-bold text-[#141416]">20% Off Special Offer</p>
            <p className="text-[#7A7A85] mt-0.5">
              Use code SAVE13 at checkout for an instant $13.00 discount.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-[#F5F5F7]">
            <p className="font-bold text-[#141416]">Sheila Lemke sent a message</p>
            <p className="text-[#7A7A85] mt-0.5">
              Your bouquet is freshly hydrated and ready for delivery.
            </p>
          </div>
        </div>
      </AppDialog>

      {/* Filter Dialog */}
      <AppDialog
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        titleId="filter-dialog-title"
        title="Filter Bouquets"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#141416]">Minimum Rating</p>
            <div className="flex gap-2">
              {[0, 4.8, 4.9].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMinRating(r)}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                    minRating === r
                      ? "bg-[#6F1AB6] text-white"
                      : "bg-[#F5F5F7] text-[#141416]"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}★+`}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setFilterOpen(false)}
            className="w-full py-2.5 rounded-full bg-[#6F1AB6] text-white text-sm font-semibold cursor-pointer"
          >
            Apply Filter
          </button>
        </div>
      </AppDialog>
    </div>
  );
}
