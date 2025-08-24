"use client";
import React from "react";
import { WalletButton } from "@/components/ui/WalletButton";
import SwitchToSepolia from "@/components/network/SwitchToSepolia";

interface HeaderProps {
  address?: string;
}

const Header: React.FC<HeaderProps> = ({ address }) => (
  <header className="fixed top-0 left-0 w-full bg-zinc-900/90 border-b border-zinc-800 shadow-md z-30 flex items-center justify-between px-8 py-3">
    <div className="flex flex-col">
      <span className="font-mono text-2xl font-bold text-white tracking-wide">JuiceWRLD</span>
      <span className="font-mono text-xs text-zinc-400 mt-1">ERC721/1155 Smart Contract Demo</span>
    </div>
    <div className="flex items-center gap-4">
      <SwitchToSepolia />
      {address && (
        <span className="font-mono text-xs text-green-400 bg-zinc-800 px-3 py-1 rounded-lg">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
      )}
      <WalletButton />
    </div>
  </header>
);

export default Header;