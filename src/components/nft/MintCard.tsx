"use client";
import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MintCardProps {
  mintAmount: number;
  setMintAmount: (amount: number) => void;
  isContractLoading: boolean;
  isTxLoading: boolean;
  mintMessage: string | null;
  isTxSuccess: boolean;
  address?: string;
  handleMint: () => Promise<void>;
}

const MintCard: React.FC<MintCardProps> = ({
  mintAmount,
  setMintAmount,
  isContractLoading,
  isTxLoading,
  mintMessage,
  isTxSuccess,
  address,
  handleMint,
}) => (
  <Card className="w-full md:w-[480px] bg-zinc-900/95 rounded-2xl shadow-2xl p-10 flex flex-col space-y-8 border border-zinc-700">
    <CardTitle className="text-3xl md:text-4xl font-mono font-extrabold text-white mb-2">JuiceWRLD NFT</CardTitle>
    <div className="bg-green-900/40 rounded-lg p-4 mb-2">
      <div className="mt-2 bg-green-950 rounded p-2 text-center">
        <span className="font-mono text-green-200">SALE PRICE</span><br />
        <span className="font-bold text-green-300 text-lg">FREE</span>
      </div>
    </div>
    <div className="flex items-center gap-2 mb-2">
      <span className="text-zinc-300 text-sm"># to Mint</span>
      <input
        type="number"
        min={1}
        max={1}
        value={mintAmount}
        onChange={e => setMintAmount(Number(e.target.value))}
        className="w-16 px-2 py-1 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <Button
        className="px-3 py-1 rounded bg-zinc-700 text-white text-xs font-mono"
        onClick={() => setMintAmount(1)}
      >Max</Button>
      {mintMessage && (
        <div className="mt-2 text-xs text-center text-blue-400 font-mono">{mintMessage}</div>
      )}
      {isTxSuccess && (
        <div className="mt-2 text-xs text-center text-green-400 font-mono">Mint réussi !</div>
      )}
    </div>
    
    <Button
      onClick={handleMint}
      disabled={!address || isContractLoading || isTxLoading}
      className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 px-6 rounded-lg transition-all duration-200"
    >
      {isTxLoading ? "Minting..." : isContractLoading ? "Loading..." : "Mint NFT"}
    </Button>
  </Card>
);

export default MintCard;