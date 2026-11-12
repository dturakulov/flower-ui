"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export function ChatScreen() {
  const { messages, sendMessage, goBack, navigate } = useApp();
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    sendMessage(draft);
    setDraft("");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F6FA] overflow-hidden">
      {/* Purple Top Chat Header matching bottom-right screen */}
      <header className="bg-[#6F1AB6] text-white px-4 pt-2 pb-4 rounded-b-[24px] flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            aria-label="Go back"
            onClick={goBack}
            className="w-9 h-9 rounded-full bg-white text-[#141416] flex items-center justify-center shrink-0 hover:bg-[#F4ECFB] transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src="/images/florist-shop-1.jpg"
                alt="Sheila Lemke"
                className="w-10 h-10 rounded-full object-cover border-2 border-white/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#6F1AB6]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[14px] font-bold truncate">Sheila Lemke</h1>
              <p className="text-[11px] text-white/80">Online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            aria-label="Start voice call"
            onClick={() => navigate("call")}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition cursor-pointer"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            type="button"
            aria-label="Chat options"
            onClick={() => navigate("florist-store")}
            className="w-9 h-9 rounded-full bg-white text-[#141416] flex items-center justify-center cursor-pointer"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto phone-scroll px-4 py-4 space-y-3">
        <div className="flex justify-center">
          <span className="px-3 py-1 rounded-full bg-white text-[10px] font-bold tracking-wider text-[#7A7A85] shadow-xs">
            TODAY
          </span>
        </div>

        {messages.map((msg) => {
          const isMe = msg.sender === "me";
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed shadow-xs ${
                  isMe
                    ? "bg-[#6F1AB6] text-white rounded-br-sm"
                    : "bg-white text-[#141416] rounded-bl-sm border border-[#EFEFF4]"
                }`}
              >
                {msg.text}
              </div>

              <div className="flex items-center gap-1.5 mt-1 px-1">
                {!isMe && (
                  <img
                    src="/images/florist-shop-1.jpg"
                    alt={msg.senderName}
                    className="w-4 h-4 rounded-full object-cover"
                  />
                )}
                <span className="text-[10px] font-medium text-[#7A7A85]">
                  {isMe ? "You" : msg.senderName} • {msg.time}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Input Composer */}
      <form
        onSubmit={handleSend}
        className="shrink-0 bg-white border-t border-[#EFEFF4] px-3 pt-2.5 pb-6 flex items-center gap-2"
      >
        <button
          type="button"
          aria-label="Add emoji"
          onClick={() => setDraft((d) => `${d} 🌸`.trimStart())}
          className="w-9 h-9 rounded-full bg-[#F5F5F7] text-[#7A7A85] hover:text-[#6F1AB6] flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Smile className="w-4 h-4" />
        </button>

        <input
          type="text"
          aria-label="Message Sheila Lemke"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 min-w-0 rounded-full bg-[#F5F5F7] px-4 py-2.5 text-[12.5px] text-[#141416] placeholder:text-[#8E8E99] outline-none focus:ring-2 focus:ring-[#6F1AB6]/40"
        />

        <button
          type="button"
          aria-label="Attach photo"
          onClick={() => navigate("product-detail")}
          className="w-9 h-9 rounded-full bg-[#F5F5F7] text-[#7A7A85] hover:text-[#6F1AB6] flex items-center justify-center shrink-0 cursor-pointer"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <button
          type="submit"
          aria-label="Send message"
          className="w-9 h-9 rounded-full bg-[#6F1AB6] hover:bg-[#581294] text-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
