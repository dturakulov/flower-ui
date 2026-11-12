"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { AppDialog } from "@/components/AppDialog";

export function SignInScreen() {
  const { navigate, showToast } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Welcome back!");
    navigate("home");
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white px-6 pt-8 pb-7 overflow-y-auto phone-scroll">
      <div>
        <div className="text-center space-y-1.5 mb-7">
          <h1 className="text-[24px] font-bold text-[#141416]">Sign In</h1>
          <p className="text-[12.5px] text-[#7A7A85]">
            Hi! Welcome back, you&apos;ve been missed
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="signin-email"
              className="block text-xs font-semibold text-[#141416]"
            >
              Email
            </label>
            <input
              id="signin-email"
              name="email"
              type="email"
              autoComplete="username"
              spellCheck={false}
              enterKeyHint="next"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#6F1AB6] focus:bg-white px-4 py-3 text-sm text-[#141416] placeholder:text-[#A0A0AB] outline-none transition"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="signin-password"
              className="block text-xs font-semibold text-[#141416]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="signin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                enterKeyHint="done"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#6F1AB6] focus:bg-white pl-4 pr-11 py-3 text-sm text-[#141416] placeholder:text-[#A0A0AB] outline-none transition"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7A7A85] hover:text-[#141416] cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setForgotOpen(true)}
              className="text-xs font-semibold text-[#6F1AB6] underline underline-offset-2 cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#6F1AB6] hover:bg-[#581294] active:scale-[0.99] text-white text-sm font-semibold shadow-md shadow-[#6F1AB6]/25 transition cursor-pointer mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#EBEBF0]" />
          <span className="text-[11px] text-[#8E8E99]">Or sign in with</span>
          <div className="flex-1 h-px bg-[#EBEBF0]" />
        </div>

        <div className="flex items-center justify-center gap-4">
          {[
            { label: "Apple", glyph: "" },
            { label: "Google", glyph: "G" },
            { label: "Facebook", glyph: "f" },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              aria-label={`Sign in with ${item.label}`}
              onClick={() => {
                showToast(`Signed in with ${item.label}`);
                navigate("home");
              }}
              className="w-12 h-12 rounded-full border border-[#EBEBF0] bg-white hover:bg-[#F8F5FC] flex items-center justify-center text-base font-bold text-[#141416] transition cursor-pointer"
            >
              {item.glyph}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-[#7A7A85] pt-6">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("create-account")}
          className="text-[#6F1AB6] font-semibold underline underline-offset-2 cursor-pointer"
        >
          Sign Up
        </button>
      </p>

      <AppDialog
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        titleId="forgot-password-title"
        title="Reset Password"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setForgotOpen(false);
            showToast("Reset link sent to your email");
          }}
          className="space-y-3"
        >
          <p className="text-xs text-[#7A7A85]">
            Enter your account email and we&apos;ll send a verification code.
          </p>
          <input
            type="email"
            required
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full rounded-xl bg-[#F5F5F7] px-3.5 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#6F1AB6]"
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-[#6F1AB6] text-white text-sm font-semibold cursor-pointer"
          >
            Send Code
          </button>
        </form>
      </AppDialog>
    </div>
  );
}

export function CreateAccountScreen() {
  const { navigate, showToast } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Account created!");
    navigate("home");
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-white px-6 pt-7 pb-7 overflow-y-auto phone-scroll">
      <div>
        <div className="text-center space-y-1.5 mb-6">
          <h1 className="text-[24px] font-bold text-[#141416]">
            Create Account
          </h1>
          <p className="text-[12px] leading-relaxed text-[#7A7A85] max-w-[260px] mx-auto">
            Fill your information below or register with your social account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label
              htmlFor="signup-name"
              className="block text-xs font-semibold text-[#141416]"
            >
              Name
            </label>
            <input
              id="signup-name"
              name="fullname"
              type="text"
              autoComplete="name"
              enterKeyHint="next"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah Jenkins"
              className="w-full rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#6F1AB6] focus:bg-white px-4 py-2.5 text-sm text-[#141416] placeholder:text-[#A0A0AB] outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="signup-email"
              className="block text-xs font-semibold text-[#141416]"
            >
              Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="username"
              spellCheck={false}
              enterKeyHint="next"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#6F1AB6] focus:bg-white px-4 py-2.5 text-sm text-[#141416] placeholder:text-[#A0A0AB] outline-none transition"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="signup-password"
              className="block text-xs font-semibold text-[#141416]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                enterKeyHint="done"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl bg-[#F5F5F7] border border-transparent focus:border-[#6F1AB6] focus:bg-white pl-4 pr-11 py-2.5 text-sm text-[#141416] placeholder:text-[#A0A0AB] outline-none transition"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#7A7A85] cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2.5 pt-1 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded accent-[#6F1AB6]"
            />
            <span className="text-xs text-[#7A7A85]">
              Agree with{" "}
              <span className="text-[#6F1AB6] font-semibold underline">
                Terms &amp; Condition
              </span>
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-[#6F1AB6] hover:bg-[#581294] active:scale-[0.99] text-white text-sm font-semibold shadow-md shadow-[#6F1AB6]/25 transition cursor-pointer mt-2"
          >
            Sign Up
          </button>
        </form>
      </div>

      <p className="text-center text-xs text-[#7A7A85] pt-5">
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
  );
}
