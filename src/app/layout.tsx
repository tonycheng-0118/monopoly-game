import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "台灣地產大亨 (Taiwan Monopoly)",
  description: "A Taiwan-themed Monopoly game built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
