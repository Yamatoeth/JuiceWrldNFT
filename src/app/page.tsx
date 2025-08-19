"use client";
import React from "react";
import Header from "@/components/Header";
import MintCard from "@/components/MintCard";
import { useMint } from "@/hooks/useMint";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function Home() {
  const {
    mintAmount,
    setMintAmount,
    handleMint,
    loading,
    isTxLoading,
    mintMessage,
    isTxSuccess,
    address,
  } = useMint();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-zinc-900 to-blue-900 flex items-center justify-center p-0 relative">
      {/* Halo/flou background effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-radial from-blue-900/60 via-blue-800/30 to-transparent blur-2xl" />
      </div>
      <Header address={address} />
      <div className="relative z-10 flex flex-col items-center w-full pt-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl mx-auto">
          <MintCard
            mintAmount={mintAmount}
            setMintAmount={setMintAmount}
            handleMint={handleMint}
            loading={loading}
            isTxLoading={isTxLoading}
            mintMessage={mintMessage}
            isTxSuccess={isTxSuccess}
            address={address}
          />
          {/* NFT image right */}
          <div className="flex items-center justify-center w-full md:w-[320px]">
            <div className="relative w-72 h-72 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-400 via-blue-700 to-blue-900 border-8 border-white shadow-2xl">
              <Image
                src="/images/1.png"
                alt="NFT preview"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
          </div>
        </div>
        {/* Footer network bar */}
        <div className="fixed bottom-0 left-0 w-full bg-zinc-900/80 border-t border-zinc-700 py-2 px-4 flex items-center justify-between text-green-400 font-mono text-xs z-20">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> SEPOLIA TESTNET</span>
          <span className="text-zinc-400">Juice WRLD NFT Demo</span>
        </div>
      </div>
    </main>
  );
}
