"use client";

import React from "react";
import { ConnectButton, useActiveAccount, useReadContract, useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import contractABI from "./contractABI.json";
import { client } from "./client";
import { sepolia } from "thirdweb/chains";
import Image from "next/image";
import thirdwebIcon from "@public/thirdweb.svg";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const CONTRACT_ADDRESS = "0xe7F4ABC55d3B05a9bf7619400c1235Bb2A0cBF09";

export default function Home() {
  const [mintAmount, setMintAmount] = React.useState(1);
  const account = useActiveAccount();

  // Instancier le contrat une seule fois
  const contract = React.useMemo(() => getContract({
    client,
    address: CONTRACT_ADDRESS,
    chain: sepolia,
    abi: contractABI as any
  }), []);

  // Lire les valeurs du contrat
  const { data: claimedSupply } = useReadContract({
    contract,
    method: "totalClaimedSupply",
    params: []
  });
  const { data: totalSupply } = useReadContract({
    contract,
    method: "totalSupply",
    params: []
  });

  const claimed = claimedSupply ? Number(claimedSupply) : 0;
  const total = totalSupply ? Number(totalSupply) : 1000;
  const price = '0.001 ETH'; // Remplacer par la vraie valeur si disponible
  const progressPercent = Math.min((claimed / total) * 100, 100);

  // Hook pour envoyer la transaction
  const { mutate: sendTransaction, status } = useSendTransaction();

  // Fonction pour minter le NFT
  const handleMint = async () => {
    if (!account) return;
    try {
      // Récupérer la fonction ABI 'mintTo' du fichier JSON
      const mintToAbi = (contractABI as any[]).find(f => f.name === "mintTo" && f.type === "function");
      if (!mintToAbi) throw new Error("La fonction 'mintTo' n'existe pas dans l'ABI du contrat.");
      const tx = prepareContractCall({
        contract,
        method: mintToAbi,
        params: [account.address, mintAmount],
        value: BigInt(1e15), // 0.001 ETH en wei
      });
      await sendTransaction(tx);
    } catch (err: any) {
      console.error("Mint failed", err);
      alert("Mint failed: " + (err?.message || err));
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-950 via-zinc-900 to-blue-900 flex items-center justify-center p-0 relative">
      {/* Halo/flou background effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-gradient-radial from-blue-900/60 via-blue-800/30 to-transparent blur-2xl" />
      </div>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-zinc-900/90 border-b border-zinc-800 shadow-md z-30 flex items-center justify-between px-8 py-3">
        <div className="flex flex-col">
          <span className="font-mono text-2xl font-bold text-white tracking-wide">JuiceWRLD</span>
          <span className="font-mono text-xs text-zinc-400 mt-1">ERC721/1155 Smart Contract Demo</span>
        </div>
        <div className="flex items-center gap-4">
          {account?.address && (
            <span className="font-mono text-xs text-green-400 bg-zinc-800 px-3 py-1 rounded-lg">{account.address.slice(0, 6)}...{account.address.slice(-4)}</span>
          )}
          <ConnectButton client={client} />
        </div>
      </header>
      <div className="relative z-10 flex flex-col items-center w-full pt-20">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl mx-auto">
          {/* Card left */}
          <Card className="w-full md:w-[480px] bg-zinc-900/95 rounded-2xl shadow-2xl p-10 flex flex-col space-y-8 border border-zinc-700">
            <CardTitle className="text-3xl md:text-4xl font-mono font-extrabold text-white mb-2">JuiceWRLD NFT</CardTitle>
            <div className="bg-green-900/40 rounded-lg p-4 mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-lg text-white">TOTAL MINTED</span>
                <span className="font-bold text-green-300 text-lg">{claimed.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                
                <span className="ml-4 w-2 h-2 rounded-full bg-green-400 inline-block" />
                <span className="font-mono text-green-300">Live</span>
                <span className="ml-2 text-xs text-zinc-400">ENDS IN ∞</span>
              </div>
              <div className="mt-2 bg-green-950 rounded p-2 text-center">
                <span className="font-mono text-green-200">SALE PRICE</span><br />
                <span className="font-bold text-green-300 text-lg">{price}</span>
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
              <Button
                className="px-6 py-2 rounded font-semibold shadow-md transition bg-blue-700 hover:bg-blue-800 text-white ml-2"
                onClick={handleMint}
              >
                Mint
              </Button>
            </div>
          </Card>
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