"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import ThirdwebWrapper from "@/providers/ThirdwebWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThirdwebWrapper>
          {children}
        </ThirdwebWrapper>
      </body>
    </html>
  );
}