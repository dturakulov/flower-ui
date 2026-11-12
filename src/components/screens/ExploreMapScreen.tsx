"use client";

import React, { useState } from "react";
import {
  Crosshair,
  Heart,
  MapPin,
  Navigation,
  Search,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { FLORISTS } from "@/data/mockData";

export function ExploreMapScreen() {
  const { openFloristStore, showToast } = useApp();
  const [query, setQuery] = useState("");
  const [selectedFloristId, setSelectedFloristId] = useState(FLORISTS[0].id);
  const [likedFlorists, setLikedFlorists] = useState<string[]>([]);

  const filtered = FLORISTS.filter((f) => {
    const q = query.trim().toLowerCase();
    return (
      !q ||
      f.name.toLowerCase().includes(q) ||
      f.owner.toLowerCase().includes(q)
    );
  });

  const toggleFloristLike = (id: string) => {
    setLikedFlorists((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative flex-1 overflow-hidden bg-[#F1F0F4]">
      {/* Stylized NYC Lower Manhattan Vector Map matching screenshot */}
      <svg
        viewBox="0 0 390 680"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        aria-hidden="true"
      >
        <rect width="390" height="680" fill="#F2F1F5" />
        {/* Soft City Blocks */}
        <g fill="#E7E6EC">
          <rect x="20" y="60" width="90" height="55" rx="6" />
          <rect x="130" y="55" width="95" height="62" rx="6" />
          <rect x="245" y="45" width="110" height="72" rx="6" />
          <rect x="18" y="135" width="88" height="75" rx="6" />
          <rect x="128" y="140" width="96" height="65" rx="6" />
          <rect x="245" y="138" width="115" height="78" rx="6" />
          <rect x="24" y="232" width="90" height="68" rx="6" />
          <rect x="134" y="226" width="92" height="74" rx="6" />
          <rect x="246" y="236" width="108" height="70" rx="6" />
          <rect x="30" y="324" width="88" height="72" rx="6" />
          <rect x="140" y="320" width="94" height="75" rx="6" />
          <rect x="255" y="328" width="104" height="68" rx="6" />
          <rect x="42" y="418" width="88" height="64" rx="6" />
          <rect x="150" y="415" width="92" height="68" rx="6" />
        </g>

        {/* White Street Network */}
        <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
          {/* Diagonal Avenues */}
          <path d="M90 0 L155 680" strokeWidth="14" />
          <path d="M235 0 L210 680" strokeWidth="16" />
          <path d="M350 0 L285 680" strokeWidth="12" />
          {/* Cross Streets */}
          <path d="M0 115 L390 150" strokeWidth="10" />
          <path d="M0 198 L390 232" strokeWidth="11" />
          <path d="M0 284 L390 318" strokeWidth="10" />
          <path d="M0 370 L390 402" strokeWidth="9" />
          <path d="M0 456 L390 488" strokeWidth="9" />
        </g>

        {/* Street Labels matching the screenshot */}
        <g fill="#A1A0AC" fontSize="10" fontWeight="600" fontFamily="sans-serif">
          <text x="150" y="122" transform="rotate(5 150 122)">
            Worth St
          </text>
          <text x="138" y="205" transform="rotate(5 138 205)">
            Reade St
          </text>
          <text x="122" y="290" transform="rotate(5 122 290)">
            Chambers St
          </text>
          <text x="112" y="376" transform="rotate(5 112 376)">
            Warren St
          </text>
          <text x="86" y="454" transform="rotate(5 86 454)">
            Park Pl
          </text>
          <text x="216" y="242" transform="rotate(-84 216 242)">
            Broadway
          </text>
          <text x="104" y="395" transform="rotate(-84 104 395)">
            Church St
          </text>
        </g>
      </svg>

      {/* Top Search Florists Bar */}
      <div className="relative z-20 px-4 pt-3 flex items-center gap-2.5">
        <div className="flex-1 min-w-0 bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-2 shadow-md">
          <Search className="w-4 h-4 text-[#6F1AB6] shrink-0" />
          <input
            type="search"
            aria-label="Search Florists"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Florists"
            className="w-full min-w-0 bg-transparent text-[13px] text-[#141416] placeholder:text-[#8E8E99] outline-none"
          />
        </div>
        <button
          type="button"
          aria-label="Filter florists"
          onClick={() => showToast("Showing nearby florists within 10 Km")}
          className="w-[42px] h-[42px] rounded-xl bg-[#6F1AB6] text-white flex items-center justify-center shadow-md shrink-0 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Florist Map Pins */}
      {filtered.map((florist) => {
        const selected = selectedFloristId === florist.id;
        return (
          <button
            key={florist.id}
            type="button"
            onClick={() => setSelectedFloristId(florist.id)}
            style={{
              left: `${florist.mapX}%`,
              top: `${florist.mapY}%`,
            }}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer"
          >
            <div
              className={`w-11 h-11 rounded-full p-0.5 bg-white shadow-lg transition transform ${
                selected
                  ? "ring-3 ring-[#6F1AB6] scale-110"
                  : "ring-2 ring-white hover:scale-105"
              }`}
            >
              <img
                src={florist.avatar}
                alt={florist.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span
              className={`mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm whitespace-nowrap ${
                selected
                  ? "bg-[#6F1AB6] text-white"
                  : "bg-white text-[#141416]"
              }`}
            >
              {florist.distanceKm.toFixed(1)} Km
            </span>
          </button>
        );
      })}

      {/* Current User Location Purple Pin */}
      <div
        aria-hidden="true"
        className="absolute left-[54%] top-[46%] -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center"
      >
        <span className="absolute w-12 h-12 rounded-full bg-[#6F1AB6]/20 animate-ping" />
        <span className="w-9 h-9 rounded-full bg-[#6F1AB6] text-white flex items-center justify-center shadow-lg border-2 border-white">
          <Navigation className="w-4 h-4 fill-white" />
        </span>
      </div>

      {/* Recenter Map FAB */}
      <button
        type="button"
        aria-label="Center on my location"
        onClick={() => {
          setSelectedFloristId(FLORISTS[0].id);
          showToast("Centered on New York, USA");
        }}
        className="absolute right-4 bottom-[205px] z-20 w-10 h-10 rounded-full bg-white text-[#6F1AB6] shadow-md flex items-center justify-center hover:bg-[#F4ECFB] transition cursor-pointer"
      >
        <Crosshair className="w-4 h-4" />
      </button>

      {/* Bottom Horizontal Florist Cards */}
      <div className="absolute inset-x-0 bottom-3 z-20 px-4 flex gap-3 overflow-x-auto phone-scroll snap-x snap-mandatory">
        {filtered.map((florist) => {
          const liked = likedFlorists.includes(florist.id);
          const selected = selectedFloristId === florist.id;
          return (
            <div
              key={florist.id}
              onClick={() => setSelectedFloristId(florist.id)}
              className={`snap-start shrink-0 w-[236px] rounded-2xl bg-white p-2.5 shadow-lg border transition cursor-pointer ${
                selected ? "border-[#6F1AB6]" : "border-[#EFEFF4]"
              }`}
            >
              <div className="relative h-[94px] rounded-xl overflow-hidden bg-[#F5F5F7] mb-2">
                <img
                  src={florist.image}
                  alt={florist.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-[#141416] flex items-center gap-0.5 shadow-xs">
                  <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                  {florist.rating.toFixed(1)}
                </span>
                <button
                  type="button"
                  aria-label={`Favorite ${florist.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFloristLike(florist.id);
                  }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 flex items-center justify-center shadow-xs cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      liked ? "fill-[#EF4444] text-[#EF4444]" : "text-[#7A7A85]"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-[13px] font-bold text-[#141416] truncate">
                    {florist.name}
                  </h3>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      openFloristStore(florist.id);
                    }}
                    className="text-[10.5px] font-bold text-[#6F1AB6] hover:underline shrink-0 cursor-pointer"
                  >
                    Visit
                  </button>
                </div>
                <div className="flex items-center gap-2 text-[10.5px] text-[#7A7A85]">
                  <span className="truncate">{florist.owner}</span>
                  <span className="flex items-center gap-0.5 truncate">
                    <MapPin className="w-3 h-3 text-[#6F1AB6]" />
                    {florist.location}
                  </span>
                </div>
                <p className="text-[11.5px] font-bold text-[#6F1AB6]">
                  {florist.priceRange}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
