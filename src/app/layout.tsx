"use client";
import { WagmiProvider, createConfig, http, fallback } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: fallback([
      http('https://ethereum-sepolia-rpc.publicnode.com', {
        timeout: 15_000,
      }),
      http('https://sepolia.drpc.org', {
        timeout: 15_000,
      }),
      http('https://rpc2.sepolia.org', {
        timeout: 15_000,
      }),
      http(), // fallback vers le RPC par défaut
    ]),
  },
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
