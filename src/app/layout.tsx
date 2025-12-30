import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "见地 (IN SIGHT)",
    template: "%s | 见地"
  },
  description: "私人灵感策展空间 · 每一条存入的灵感都是一件被精心摆放的艺术品",
  keywords: ["灵感", "策展", "收藏", "艺术", "美学"],
  authors: [{ name: "见地 IN SIGHT" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://insight.vercel.app",
    siteName: "见地 IN SIGHT",
  },
  twitter: {
    card: "summary_large_image",
    title: "见地 (IN SIGHT)",
    description: "私人灵感策展空间 · 每一条存入的灵感都是一件被精心摆放的艺术品",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased" style={{ backgroundColor: '#F5F5F7' }}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
