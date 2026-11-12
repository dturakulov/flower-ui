"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export function CallScreen() {
  const { navigate } = useApp();
  const [seconds, setSeconds] = useState(12 * 60 + 8); // starts at 12:08 like screenshot
  const [muted, setMuted] = useState(false);
  const [speakerOff, setSpeakerOff] = useState(false);
  const [videoOff, setVideoOff] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="relative flex-1 flex flex-col justify-between overflow-hidden bg-[#2A1D3D] text-white">
      {/* Blurred Portrait Backdrop matching top-right call screen */}
      <img
        src="/images/florist-shop-1.jpg"
        alt="Sheila Lemke"
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px] opacity-85"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-[#240B3B]/80"
      />

      {/* Top Call Info */}
      <div className="relative z-10 px-4 pt-3 flex items-center justify-between">
        <button
          type="button"
          aria-label="Back to chat"
          onClick={() => navigate("chat")}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold">
          HD Encrypted Call
        </span>
        <div className="w-9" />
      </div>

      {/* Caller Name & Timer */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 -mt-8">
        <div className="w-28 h-28 rounded-full p-1 bg-white/25 backdrop-blur-md shadow-2xl mb-4">
          <img
            src="/images/florist-shop-1.jpg"
            alt="Sheila Lemke"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h1 className="text-[22px] font-bold tracking-tight drop-shadow">
          Sheila Lemke
        </h1>
        <p className="text-sm font-medium text-white/85 mt-1 tabular-nums">
          {mins}:{secs}
        </p>
      </div>

      {/* Purple Floating Call Control Bar matching top-right-center screen */}
      <div className="relative z-10 px-4 pb-7">
        <div className="rounded-[28px] bg-[#6F1AB6]/95 backdrop-blur-md px-4 py-3.5 flex items-center justify-between shadow-2xl border border-white/15">
          <button
            type="button"
            aria-label={speakerOff ? "Unmute speaker" : "Mute speaker"}
            onClick={() => setSpeakerOff((v) => !v)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              speakerOff ? "bg-white text-[#6F1AB6]" : "bg-white/15 text-white"
            }`}
          >
            {speakerOff ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            aria-label={muted ? "Unmute microphone" : "Mute microphone"}
            onClick={() => setMuted((v) => !v)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              muted ? "bg-white text-[#6F1AB6]" : "bg-white/15 text-white"
            }`}
          >
            {muted ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            aria-label="End call"
            onClick={() => navigate("chat")}
            className="w-13 h-13 rounded-full bg-[#EF4444] hover:bg-[#DC2626] active:scale-95 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
          >
            <PhoneOff className="w-5 h-5" />
          </button>

          <button
            type="button"
            aria-label={videoOff ? "Turn on video" : "Turn off video"}
            onClick={() => setVideoOff((v) => !v)}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition cursor-pointer ${
              videoOff ? "bg-white text-[#6F1AB6]" : "bg-white/15 text-white"
            }`}
          >
            {videoOff ? (
              <VideoOff className="w-5 h-5" />
            ) : (
              <Video className="w-5 h-5" />
            )}
          </button>

          <button
            type="button"
            aria-label="Open chat"
            onClick={() => navigate("chat")}
            className="w-11 h-11 rounded-2xl bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
