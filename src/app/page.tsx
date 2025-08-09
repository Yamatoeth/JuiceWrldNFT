"use client";

import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CONTRACT_ADDRESS = "0xe7F4ABC55d3B05a9bf7619400c1235Bb2A0cBF09";

export default function Home() {
  // For demo purposes, we'll use static values
  const claimed = 150;
  const total = 1000;
  const progressPercent = Math.min((claimed / total) * 100, 100);

  return (
    <main className="min-h-screen bg-zinc-900 flex flex-col items-center justify-center p-6 text-zinc-100">
      <Card className="max-w-md w-full bg-zinc-800 rounded-xl shadow-lg p-8 flex flex-col items-center space-y-6">
        <Image
          src={thirdwebIcon}
          alt="thirdweb logo"
          className="w-36 h-36 drop-shadow-lg"
          priority
        />
        <CardContent className="text-center">
          <CardTitle className="text-4xl font-bold">Juice WRLD NFT Collection</CardTitle>
          <CardDescription className="text-zinc-300 mt-2">
            Mint your NFT for free on Sepolia testnet. Connect your wallet and mint 1 NFT for 0.0001 ETH.
          </CardDescription>
        </CardContent>

        <div className="flex space-x-4 w-full justify-center">
          <Button 
            className="px-6 py-3 rounded-lg font-semibold shadow-md transition bg-blue-600 hover:bg-blue-700"
            onClick={() => alert("Wallet connection will be available soon!")}
          >
            Connect Wallet
          </Button>
          
          <Button 
            className="px-6 py-3 rounded-lg font-semibold shadow-md transition bg-purple-600 hover:bg-purple-700"
            onClick={() => alert("Minting will be available after wallet connection!")}
          >
            Mint 1 NFT (0.0001 ETH)
          </Button>
        </div>

        <div className="w-full">
          <div className="flex justify-between mb-1 text-sm text-zinc-400">
            <span>Minted: {claimed} / {total}</span>
            <span>{Math.floor(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-4 rounded-full bg-zinc-700" />
        </div>

        <div className="mt-4 text-xs text-zinc-400 italic">
          Contract deployed on Sepolia testnet: {CONTRACT_ADDRESS}
        </div>
        
        <div className="mt-2 text-xs text-zinc-500 text-center">
          🚧 This is a demo version. Wallet connectivity coming soon!
        </div>
      </Card>
    </main>
  );
}
