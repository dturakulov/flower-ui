import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PetalFlow — Flower Delivery App Showcase",
  description:
    "Interactive 1:1 Next.js mobile prototype for flower delivery and boutique florists.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="min-h-dvh bg-[#ECEEF3] text-[#141416] font-sans selection:bg-[#6F1AB6]/20 selection:text-[#6F1AB6]">
        {children}
      </body>
    </html>
  );
}
