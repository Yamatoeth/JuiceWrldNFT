"use client";
import React from "react";
import Header from "@/components/Header";
import MintCard from "@/components/MintCard";
import { useMint } from "@/hooks/useMint";
import Image from "next/image";

export default function MintApp() {
  const mintHook = useMint();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            JUICE WRLD
          </h1>
          <p className="text-2xl text-purple-200 mb-2">NFT COLLECTION</p>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            NFT Smart contract using claim function  
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
              <Image
                src="/images/1.png"
                alt="Juice WRLD NFT"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>

          <div className="w-full max-w-md">
            <MintCard {...mintHook} />
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">About</h3>
            <p className="text-gray-300 leading-relaxed">
              This page was built with React for a modern and responsive interface. It integrates RainbowKit for seamless wallet connections, Wagmi for robust Ethereum interactions, and Thirdweb to deploy and interact easily with smart contracts. This project showcases my skills in web3 development, modern frontend integration, and blockchain interaction.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
