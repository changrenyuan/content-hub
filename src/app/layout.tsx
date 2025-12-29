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
    default: "内容收藏站",
    template: "%s | 内容收藏站"
  },
  description: "收藏和分享优质内容的个人网站",
  keywords: ["内容收藏", "工具推荐", "文章分享", "设计灵感"],
  authors: [{ name: "内容收藏站" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://content-hub.vercel.app",
    siteName: "内容收藏站",
  },
  twitter: {
    card: "summary_large_image",
    title: "内容收藏站",
    description: "收藏和分享优质内容的个人网站",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
