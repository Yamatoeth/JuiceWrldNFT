"use client";
import { useNetwork, useChainId } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function SwitchToSepolia() {
  const [, switchNetwork] = useNetwork();
  const chainId = useChainId();
  const [isSwitching, setIsSwitching] = useState(false);

  const handleSwitchNetwork = async () => {
    if (!switchNetwork) return;
    
    setIsSwitching(true);
    try {
      await switchNetwork(Sepolia.chainId);
    } catch (error) {
      console.error("Failed to switch network:", error);
    } finally {
      setIsSwitching(false);
    }
  };

  // Ne pas afficher le bouton si déjà sur Sepolia
  if (chainId === Sepolia.chainId) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-amber-500">Mauvais réseau</span>
      <Button
        onClick={handleSwitchNetwork}
        disabled={isSwitching}
        variant="outline"
        className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white border-blue-600"
      >
        {isSwitching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Changement...
          </>
        ) : (
          'Passer à Sepolia'
        )}
      </Button>
    </div>
  );
}
