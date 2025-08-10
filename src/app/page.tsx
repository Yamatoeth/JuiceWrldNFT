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
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center w-full">
        <Card className="max-w-lg w-full bg-zinc-800/90 rounded-2xl shadow-2xl p-10 flex flex-col items-center space-y-8 border border-zinc-700">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 flex items-center justify-center rounded-full bg-zinc-900 shadow-lg mb-2">
              <Image
                src={thirdwebIcon}
                alt="thirdweb logo"
                width={128}
                height={128}
                className="drop-shadow-lg object-contain"
                priority
              />
            </div>
            <CardTitle className="text-4xl font-extrabold text-center">Juice WRLD NFT Collection</CardTitle>
            <CardDescription className="text-zinc-300 text-center text-lg">
              Mint your NFT for free on Sepolia testnet.<br />Connect your wallet and mint 1 NFT for 0.0001 ETH.
            </CardDescription>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
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

          <div className="w-full mt-6">
            <div className="flex justify-between mb-2 text-sm text-zinc-400">
              <span>Minted: <span className="font-bold text-zinc-100">{claimed}</span> / {total}</span>
              <span className="font-bold text-zinc-100">{Math.floor(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-4 rounded-full bg-zinc-700" />
          </div>

          <div className="mt-6 text-xs text-zinc-400 italic text-center">
            Contract deployed on Sepolia testnet:<br />
            <span className="break-all text-zinc-300">{CONTRACT_ADDRESS}</span>
          </div>
          <div className="mt-4 text-xs text-zinc-500 text-center">
            🚧 This is a demo version.<br />Wallet connectivity coming soon!
          </div>
        </Card>
      </div>
    </main>
  );
}
