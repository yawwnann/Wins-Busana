import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Blangkon Store - Blangkon Tradisional Khas Jawa",
  description: "Blangkon berkualitas tinggi dengan desain tradisional dan modern. Melestarikan budaya Jawa melalui koleksi blangkon pilihan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
