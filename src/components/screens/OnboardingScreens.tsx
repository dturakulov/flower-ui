"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";

export function OnboardingOneScreen() {
  const { navigate } = useApp();

  return (
    <div className="relative flex-1 flex flex-col justify-between bg-white px-6 pt-6 pb-8 overflow-clip">
      {/* Subtle concentric rings matching top-left screen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -left-16 w-72 h-72 rounded-full border border-[#6F1AB6]/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-8 w-56 h-56 rounded-full border border-[#6F1AB6]/10"
      />

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-xs font-semibold text-[#6F1AB6] hover:underline cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Circular hero portrait + #Flowers pink badge */}
      <div className="relative mx-auto my-2 w-[236px] h-[236px]">
        <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#F4ECFB] shadow-lg bg-[#E9F2F8]">
          <img
            src="/images/florist-shop-1.jpg"
            alt="Florist holding fresh bouquet"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="absolute bottom-3 right-1 px-3.5 py-1.5 rounded-full bg-[#F93888] text-white text-xs font-bold shadow-md">
          #Flowers
        </span>
      </div>

      {/* Copy & CTAs */}
      <div className="text-center space-y-3 mt-2">
        <h1 className="text-[22px] leading-[1.25] font-bold text-[#141416] tracking-tight">
          Your <span className="text-[#6F1AB6]">Premier Choice</span> for
          Effortless Flower Delivery
        </h1>
        <p className="text-[13px] leading-relaxed text-[#7A7A85] max-w-[280px] mx-auto">
          Discover handcrafted seasonal bouquets from local florists and get
          same-day delivery right to your doorstep.
        </p>

        <div className="pt-3 space-y-3.5">
          <button
            type="button"
            onClick={() => navigate("onboarding-2")}
            className="w-full py-3.5 rounded-full bg-[#6F1AB6] hover:bg-[#581294] active:scale-[0.99] text-white text-sm font-semibold shadow-md shadow-[#6F1AB6]/25 transition cursor-pointer"
          >
            Let&apos;s Get Started
          </button>

          <p className="text-xs text-[#7A7A85]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("sign-in")}
              className="text-[#6F1AB6] font-semibold underline underline-offset-2 cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export function OnboardingTwoScreen() {
  const { navigate } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between bg-white px-6 pt-6 pb-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="text-xs font-semibold text-[#6F1AB6] hover:underline cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Top floral showcase arch matching second onboarding screen */}
      <div className="mx-auto w-[250px] h-[270px] rounded-[36px] bg-gradient-to-b from-[#F4ECFB] to-[#FAF8FD] p-5 flex flex-col items-center justify-center relative shadow-inner">
        <div className="w-44 h-44 rounded-full bg-white shadow-md p-2 flex items-center justify-center overflow-hidden">
          <img
            src="/images/blue-white-bouquet.svg"
            alt="Blue and white bouquet"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute -bottom-3 -right-2 bg-white rounded-2xl px-3 py-2 shadow-lg border border-[#EFEFF4] flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <span className="text-[11px] font-bold text-[#141416]">
            30 min express
          </span>
        </div>
      </div>

      {/* Two-tone heading & paragraph */}
      <div className="text-center space-y-3 mt-4">
        <h1 className="text-[23px] leading-[1.22] font-bold tracking-tight text-[#141416]">
          <span className="text-[#6F1AB6]">Seamless</span> Flower
          <br />
          Shopping Experience
        </h1>
        <p className="text-[13px] leading-relaxed text-[#7A7A85] max-w-[270px] mx-auto">
          Customize bouquet sizes, chat directly with expert florists, and track
          every stem from studio to door.
        </p>
      </div>

      {/* Pagination dots + circular purple arrow button */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2" aria-label="Onboarding step 2 of 3">
          <button
            type="button"
            aria-label="Go to step 1"
            onClick={() => navigate("onboarding-1")}
            className="w-2.5 h-2.5 rounded-full bg-[#E2D4F0] cursor-pointer"
          />
          <span className="w-6 h-2.5 rounded-full bg-[#6F1AB6]" />
          <button
            type="button"
            aria-label="Go to Sign In"
            onClick={() => navigate("sign-in")}
            className="w-2.5 h-2.5 rounded-full bg-[#E2D4F0] cursor-pointer"
          />
        </div>

        <button
          type="button"
          aria-label="Continue to Sign In"
          onClick={() => navigate("sign-in")}
          className="w-12 h-12 rounded-full bg-[#6F1AB6] hover:bg-[#581294] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-[#6F1AB6]/30 transition cursor-pointer"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
