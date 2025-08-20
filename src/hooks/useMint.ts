"use client";
import React, { useState } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import contractABI from "../lib/contractABI.json";

// Export your contract address here
export const CONTRACT_ADDRESS = "0xe7F4ABC55d3B05a9bf7619400c1235Bb2A0cBF09";

export function useMint() {
  const [mintAmount, setMintAmount] = useState(1);
  const [mintMessage, setMintMessage] = useState<string | null>(null);
  const { address } = useAccount();
  
  // Hook moderne wagmi v2 pour écrire sur le contrat
  const { 
    writeContract,
    data: txHash,
    error: writeError,
    isPending: isWritePending 
  } = useWriteContract();

  // Attendre la confirmation de transaction
  const { 
    isLoading: isTxLoading,
    isSuccess: isTxSuccess 
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const handleMint = async () => {
    if (!address) {
      setMintMessage("Connectez votre wallet d'abord");
      return;
    }

    try {
      setMintMessage("Ouverture de MetaMask...");
      
      // Cette fonction déclenche automatiquement MetaMask
      writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: "claim",
        args: [address, BigInt(mintAmount)],
        value: parseEther("0.001"),
      });
      
    } catch (err: any) {
      console.error("Mint error:", err);
      setMintMessage(`Erreur: ${err?.message || "Erreur inconnue"}`);
    }
  };

  // Gestion des messages en fonction des états
  React.useEffect(() => {
    if (writeError) {
      let errorMsg = "Erreur: ";
      if (writeError.message.includes("User rejected")) {
        errorMsg += "Transaction annulée par l'utilisateur";
      } else if (writeError.message.includes("insufficient funds")) {
        errorMsg += "Fonds insuffisants";
      } else {
        errorMsg += writeError.message;
      }
      setMintMessage(errorMsg);
    } else if (txHash && !isTxSuccess && !isTxLoading) {
      setMintMessage(`Transaction envoyée ! Hash: ${txHash.slice(0, 10)}...`);
    } else if (isTxLoading) {
      setMintMessage("⏳ Confirmation en cours...");
    } else if (isTxSuccess) {
      setMintMessage("🎉 NFT minté avec succès !");
    }
  }, [writeError, txHash, isTxLoading, isTxSuccess]);

  return {
    mintAmount,
    setMintAmount,
    handleMint,
    loading: isWritePending || isTxLoading,
    isTxLoading,
    mintMessage,
    isTxSuccess,
    address,
  };
}